import { NavLink } from 'react-router-dom';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Quote from '../components/Quote';
export default function HomePage() {
    const quotesData = useLoaderData();

    return (
        <div>
            <h1>Index</h1>
            <NavLink to="all?page=1" className="nav-link text-primary">Let's go to quotes</NavLink>
        </div>
    )
}