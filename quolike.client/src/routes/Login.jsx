import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { login } from '../authentication';
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hookLogin = useAuth().login;
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await login({ email, password });
        hookLogin(user);
    };
    return (
        <div>
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
                <br />
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};