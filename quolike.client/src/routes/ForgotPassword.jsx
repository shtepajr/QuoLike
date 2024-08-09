import { Link } from "react-router-dom";
import { forgotPassword } from "../authentication";
import { useState } from "react";
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export function ForgotPasswordPage() {
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(formData);
            setMessage('Email sent to ' + formData.email + '!');
        } catch (e) {

        }
    }

    return (
        <>
            <main className="h-75 d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                            <form onSubmit={sendEmailSubmit}>
                                <img className="mb-4" src={logo} alt="logo" width="115" />
                                <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
                                <p>Enter your email address and we will send you a link to reset your password.</p>

                                {message && <p>{message}</p>}

                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <button className="btn btn-primary w-100 py-2 my-3" type="submit">Send</button>

                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <Link to="/login">Back to Login</Link>
                                    </div>
                                    <p className="mt-5 mb-3 text-body-secondary">&#169;2024 QuoLike</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}