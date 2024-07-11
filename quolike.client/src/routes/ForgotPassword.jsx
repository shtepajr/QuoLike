import { Link } from "react-router-dom";
import { forgotPassword } from "../authentication";



export function ForgotPasswordPage() {
    const sendEmailSubmit = async (e) => {
        e.preventDefault();

        // TODO: Handle form submission
        const email = e.target.email.value;
        await forgotPassword(email);
        console.log('Email sent to ' + email + '!');
        alert('Email sent!');
    }

    return (
        <>
            <h1>Forgot Password</h1>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <form onSubmit={sendEmailSubmit}>
                <input name="email" type="email" placeholder="Email" />
                <input type="submit" value="Submit" />
            </form>

            <Link to="/login">Back to Login</Link>
        </>
    )
}