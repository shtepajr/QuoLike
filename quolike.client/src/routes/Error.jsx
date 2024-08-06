import { useRouteError, useNavigate, json } from 'react-router-dom';
import { useEffect } from 'react';

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

        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}