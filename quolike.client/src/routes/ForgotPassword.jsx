import { Link } from "react-router-dom";
import { forgotPassword } from "../authentication";
import { useState } from "react";

export function ForgotPasswordPage() {
    const [message, setMessage] = useState('');
    const sendEmailSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        await forgotPassword(email);
        console.log('Email sent to ' + email + '!');
        setMessage('Email sent to ' + email + '!');
    }

    return (
        <>
            <h1>Forgot Password</h1>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <form onSubmit={sendEmailSubmit}>
                <input name="email" type="email" placeholder="Email" required/>
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login">Back to Login</Link>
            {message && <p>{message}</p>}
        </>
    )
}