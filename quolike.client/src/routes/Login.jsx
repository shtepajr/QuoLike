import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { login } from '../authentication';
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hookLogin = useAuth().login;

    const [errors, setErrors] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login({ email, password });
            hookLogin(user)
        } catch (e) {
            if (e.detail) {
                setErrors(e.detail);
            } else if (e.errors) {
                const errorMessages = Object.values(e.errors).flat();
                setErrors(errorMessages);
            } else {
                setErrors([e.title || 'Login failed']);
            }
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link><br />
            <Link to="/forgotPassword">Forgot Password</Link><br />
            <Link to="/resendConfirmationEmail">Resend Confirmation Email</Link>
            {errors && <p>{errors}</p>}
        </>
    );
};