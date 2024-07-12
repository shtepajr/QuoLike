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
            alert('New password and confirmation do not match.');
            return;
        }

        await manageInfo({ newEmail: user.email, oldPassword: passwordFormData.oldPassword, newPassword: passwordFormData.newPassword });
        setIsEditingPassword(false);
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirm = async() => {
        await manageDelete();
        await logout();
        navigate('/');
        setShowModal(false);
    };

    const handleCancel = () => {
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
                            </>
                        ) : (
                            <input type="button" value="Change password" onClick={() => setIsEditingPassword(true)} />
                        )}
                    </form>
                </div>
                <div className="col-12">
                    <button onClick={handleDeleteClick}>Delete account</button>
                    <ConfirmModal
                        show={showModal}
                        message="Are you sure you want to delete this item?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
}
