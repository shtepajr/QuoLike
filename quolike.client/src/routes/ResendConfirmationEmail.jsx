import { Link } from "react-router-dom";
import { resendConfirmationEmail } from "../authentication";
import { useState } from "react";

export function ResendConfirmationEmailPage() {
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
        await resendConfirmationEmail(formData);
        setMessage('Email sent to ' + formData.email + '!');
    }

    return (
        <>
            <h1>Resend Confirmation Email</h1>
            <p>Enter your email address and we will send you a link to confirm your email.</p>
            <form onSubmit={sendEmailSubmit}>
                <input required name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login">Back to Login</Link>
            {message && <p>{message}</p>}
        </>
    )
}