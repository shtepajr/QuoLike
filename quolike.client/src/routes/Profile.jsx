import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { manageInfo, getUserInfo, manageDelete } from '../authentication';
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export function profileLoader() {
    return getUserInfo();
}
export default function ProfilePage() {
    const user = useLoaderData();
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const [passwordFormData, setPasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            setErrors("Passwords do not match");
        } else {
            try {
                await manageInfo({ newEmail: user.email, oldPassword: passwordFormData.oldPassword, newPassword: passwordFormData.newPassword });
                setMessage('Password changed successfully');
                setIsEditingPassword(false);

            } catch (e) {
                setIsEditingPassword(false);
            }
        }
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await manageDelete();
            await logout();
            setShowModal(false);
            navigate('/');
        } catch (e) {
            if (e.detail) {
                setErrors(e.detail);
            } else if (e.errors) {
                const errorMessages = Object.values(e.errors).flat();
                setErrors(errorMessages);
            } else {
                setErrors([e.title || 'Reset password failed']);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="profile container mt-2">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                    <form onSubmit={handlePasswordSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Profile</h1>
                        <p>{user.email}</p>
                        {message && <p className="text-primary">{message}</p>}
                        {isEditingPassword ? (
                            <>
                                {errors && <p>{errors}</p>}

                                <div className="form-floating">
                                    <input
                                        name="oldPassword"
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        name="newPassword"
                                        type="password"
                                        className="form-control"
                                        id="floatingNewPassword"
                                        placeholder="New password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="floatingNewPassword">New password</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        id="floatingConfirmNewPassword"
                                        placeholder="Confirm new password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="floatingConfirmNewPassword">Confirm new password</label>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <button className="btn btn-primary" type="submit">Save</button>
                                    <button className="btn btn-secondary" type="button" onClick={() => setIsEditingPassword(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-secondary" type="button" onClick={() => setIsEditingPassword(true)}>
                                    Change password
                                </button>
                            </>
                        )}
                    </form>
                    <div className="mt-2">
                        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete account</button>
                        <ConfirmModal
                            show={showModal}
                            message="Are you sure you want to delete your account?"
                            onConfirm={handleDeleteConfirm}
                            onCancel={handleDeleteCancel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
