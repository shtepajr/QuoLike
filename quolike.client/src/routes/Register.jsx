import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { register, login } from '../authentication';
export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hookLogin = useAuth().login;
    const handleRegister = async (e) => {
        e.preventDefault();
        const user = await register({ email, password });
        hookLogin(user);
    };
    return (
        <div>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
                <br />
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
};