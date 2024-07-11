import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../authentication";

export function resetPasswordLoader({ request }) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const resetCode = url.searchParams.get("resetCode");
    console.log(email);
    console.log(resetCode);
    return { email, resetCode };
}

//import { encode as base64UrlEncode } from 'base64-url';

//function base64UrlEncode(str) {
//    return btoa(str)
//        .replace(/\+/g, '-')
//        .replace(/\//g, '_')
//        .replace(/=+$/, '');
//}

//const [password, setPassword] = useState('');
//onChange = {(e) => setPassword(e.target.value)}
//const encodedResetCode = base64UrlEncode(resetCode);
//const user = { resetCode: encodedResetCode, email, newPassword };

export const ResetPasswordPage = () => {
    const { email, resetCode } = useLoaderData();

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
        const resetCode = e.target.resetCode.value;

        const user = { resetCode, email, newPassword };

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let message = await resetPassword(user);

        alert(message);
    }

    return (

        <div>
            <h1>Reset Password</h1>
            <p>Enter your new password.</p>
            <form onSubmit={resetPasswordSubmit}>
                <input hidden name="email" type="email" defaultValue={email} />
                <input hidden name="resetCode" type="text" defaultValue={resetCode} />
                <label>
                    New Password
                    <input name="newPassword" type="password" />
                </label>
                <label>
                    Confirm Password
                    <input name="confirmPassword" type="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to="/login">Back to Login</Link>
        </div>
    );
}