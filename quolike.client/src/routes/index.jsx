import { NavLink } from "react-router-dom";
export default function Index() {
    return (
        <div>
            <h1>Index</h1>
            <NavLink to="all?page=1" className="nav-link text-primary">Let's go to quotes</NavLink>
        </div>
    )
}