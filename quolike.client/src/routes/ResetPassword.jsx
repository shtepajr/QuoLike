import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../authentication";
import { useState } from "react";
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

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
        <>
            <main className="h-75 d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                            <form onSubmit={resetPasswordSubmit}>
                                <img className="mb-4" src={logo} alt="logo" width="115" />
                                <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
                                <p>Enter your new password.</p>
                                {errors && <p>{errors}</p>}

                                <input hidden name="email" type="email" defaultValue={email} />
                                <input hidden name="resetCode" type="text" defaultValue={resetCode} />

                                <div className="form-floating">
                                    <input
                                        type="password"
                                        name="newPassword"
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
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        id="floatingConfirmPassword"
                                        placeholder="Confirm password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="floatingConfirmPassword">Confirm password</label>
                                </div>
                           
                                <button className="btn btn-primary w-100 py-2 my-3" type="submit">Change password</button>

                                <div className="d-flex flex-column align-items-center">
                                    <Link to="/login" className="link-underline link-underline-opacity-0">Back to Login</Link>
                                    <p className="mt-5 mb-3 text-body-secondary">&#169;2024 QuoLike</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>



        </>
    );
}