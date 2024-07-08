import { Link } from "react-router-dom";
export function CheckEmailPage() {
    return (
        <>
            <div>Please check your email.</div>
            <Link to="/login">Login</Link>
        </>
    )
}