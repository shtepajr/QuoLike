import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../authentication";
import { useState } from "react";

export function resetPasswordLoader({ request }) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const resetCode = url.searchParams.get("resetCode");
    if (!email || !resetCode) {
        throw new Error("Invalid URL");
    }
    return { email, resetCode };
}

export const ResetPasswordPage = () => {
    const { email, resetCode } = useLoaderData();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    const [formData, setFormData] = useState({
        resetCode: resetCode,
        email: email,
        newPassword: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setErrors("Passwords do not match");
        }
        else {
            try {
                await resetPassword(formData);
                navigate("/resetPasswordSuccess");
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
    }

    return (
        <div>
            <h1>Reset Password</h1>
            <p>Enter your new password.</p>
            <form onSubmit={resetPasswordSubmit}>
                <input hidden name="email" type="email" defaultValue={email} />
                <input hidden name="resetCode" type="text" defaultValue={resetCode} />
                <label>
                    New Password
                    <input required name="newPassword" type="password" onChange={handleInputChange} value={formData.newPassword} />
                </label>
                <label>
                    Confirm Password
                    <input required name="confirmPassword" type="password" onChange={handleInputChange} value={formData.confirmPassword} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login">Back to Login</Link>
            {errors && <p>{errors}</p>}
        </div>
    );
}