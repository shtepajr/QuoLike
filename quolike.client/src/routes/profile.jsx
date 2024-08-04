import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { manageInfo, getUserInfo, manageDelete } from '../authentication';
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../hooks/useAuth';
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

    const handlePasswordChange = (e) => {
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
                setIsEditingPassword(false);
                setMessage('Password changed successfully');
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
        <div className="profile container">
            <h1>Profile</h1>
            <p>
                This is your profile&nbsp;
                <b>{user.email}</b>
            </p>
            <div className="row d-flex flex-column justify-content-center g-3">
                <div className="col-12">
                    <form onSubmit={handlePasswordSubmit}>
                        {isEditingPassword ? (
                            <>
                                <label>
                                    Old password
                                    <input type="password" name="oldPassword" onChange={handlePasswordChange} value={passwordFormData.oldPassword} />
                                </label>
                                <label>
                                    New password
                                    <input type="password" name="newPassword" onChange={handlePasswordChange} value={passwordFormData.newPassword} />
                                </label>
                                <label>
                                    Confirm new password
                                    <input type="password" name="confirmPassword" onChange={handlePasswordChange} value={passwordFormData.confirmPassword} />
                                </label>
                                <input type="submit" value="Save" />
                                <input type="button" value="Cancel" onClick={() => setIsEditingPassword(false)} />
                                {errors && <p>{errors}</p>}
                            </>
                        ) : (
                            <>
                                <input type="button" value="Change password" onClick={() => setIsEditingPassword(true)} />
                                {message && <p>{message}</p>}
                            </>
                        )}
                    </form>
                </div>
                <div className="col-12">
                    <button onClick={handleDeleteClick}>Delete account</button>
                    <ConfirmModal
                        show={showModal}
                        message="Are you sure you want to delete this item?"
                        onConfirm={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                    />
                </div>
            </div>
        </div>
    );
}
