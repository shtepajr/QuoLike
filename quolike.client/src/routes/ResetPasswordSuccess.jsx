import { Link } from "react-router-dom";
export const ResetPasswordSuccess = () => {
    return (
        <div>
            <h1>Reset Password Success</h1>
            <p>Your password has been reset successfully.</p>
            <Link to="/login">Back to Login</Link>
        </div>
    );
}