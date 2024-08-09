import { Link } from "react-router-dom";
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export function CheckEmailPage() {
    return (
        <>
            <main className="h-75 d-flex align-items-center text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                            <img className="mb-4" src={logo} alt="logo" width="115" />
                            <h1 className="h3 mb-3 fw-normal">Please check your email</h1>
                            <div className="d-flex flex-column align-items-center">
                                <div>
                                    <Link to="/login">Back to Login</Link>
                                </div>
                                <p className="mt-5 mb-3 text-body-secondary">&#169;2024 QuoLike</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}