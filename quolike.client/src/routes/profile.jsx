import { lazy, useState } from 'react';

export default function ProfilePage(user) {
    const [isEditingPassword, setIsEditingPassword] = useState(false);

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

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            alert('New password and confirmation do not match.');
            return;
        }
        // TODO: Handle password form submission POST /manage/password
        setIsEditingPassword(false);
    };

    return (
        <div className="profile container">
            <h1>Profile</h1>
            <p>This is your profile youremail@gmail.com.{ /*TODO: Get email from user*/}</p>
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
                    <button>Delete account</button>
                </div>
            </div>
        </div>
    );
}
