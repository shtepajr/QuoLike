import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { register, login } from '../authentication';
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const [errors, setErrors] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setErrors('Passwords do not match');
            }
            await register({ email, password });
            navigate('/checkEmail');
        } catch (e) {
            if (e.detail) {
                setErrors(e.detail);
            } else if (e.errors) {
                const errorMessages = Object.values(e.errors).flat();
                setErrors(errorMessages);
            } else {
                setErrors([e.title || 'Registration failed']);
            }
        }
    };
    return (
        <>
            <main className="h-75 d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                            <form onSubmit={handleRegister}>
                                <img className="mb-4" src={logo} alt="logo" width="115" />
                                <h1 className="h3 mb-3 fw-normal">Register</h1>

                                {errors && <p>{errors}</p>}

                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </div>
                                <button className="btn btn-primary w-100 py-2 my-3" type="submit">Register</button>

                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <span>Already have an account? </span>
                                        <Link to="/login" className="link-underline link-underline-opacity-0">Login</Link>
                                    </div>
                                    <div>
                                        <Link to="/resendConfirmationEmail">Resend Confirmation Email</Link>
                                    </div>
                                    <p className="mt-5 mb-3 text-body-secondary">&#169;2024 QuoLike</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};