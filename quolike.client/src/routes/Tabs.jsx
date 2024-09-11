import { Outlet, NavLink } from 'react-router-dom';

export default function Tabs() {
    const tabs = ['all', 'favorites', 'archived'];

    return (
        <>
            <nav className="d-flex justify-content-center mt-2 mb-2">
                <ul className="nav nav-underline">
                    {tabs.map((tab) => {
                        return (
                            <li key={tab} className="nav-item">
                                <NavLink
                                    to={`${tab}?page=1`}
                                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                                >
                                    {tab}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <Outlet />
        </>
    )
}