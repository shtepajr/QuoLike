import { useRouteError, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    console.log(error.status);

    useEffect(() => {
        if (error.status === 401) {
            navigate('/login');
        }
    }, [])

    return (
        <main className="h-75 d-flex align-items-center text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                        <img className="mb-4" src={logo} alt="logo" width="115" />
                        <h1 className="h3 mb-3 fw-normal">Oops!</h1>
                        <p>Sorry, an unexpected error has occurred.</p>
                        <i>{error.statusText || error.message}</i>
                        <div className="d-flex flex-column align-items-center mt-2">
                            <div>
                                <Link to="/login">Back to Login</Link>
                            </div>
                            <p className="mt-5 mb-3 text-body-secondary">&#169;2024 QuoLike</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}