import { NavLink } from 'react-router-dom';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
import homeImage from '../assets/home.jpg';
export default function HomePage() {
    const randomQuote = useLoaderData();

    return (
        <>
            <div className=" d-flex flex-column align-items-center gap-4 mt-2">
                <h1>Welcome to QuoLike</h1>
                <NavLink to="all?page=1" className="btn btn-warning">Let's start</NavLink>
                <img src={homeImage} className="rounded-5 w-75" />
            </div>
        </>
    )
}