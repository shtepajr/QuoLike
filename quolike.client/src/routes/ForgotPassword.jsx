import { Link } from "react-router-dom";
export function ForgotPasswordPage() {

    const sendEmail = (e) => {
        e.preventDefault();

        // TODO: Handle form submission
        console.log('Email sent!');
    }

    return (
        <>
            <h1>Forgot Password</h1>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <form onSubmit={sendEmail}>
                <input type="email" placeholder="Email" />
                <input type="submit" value="Submit" />
            </form>

            <Link to="/login">Back to Login</Link>
        </>
    )
}