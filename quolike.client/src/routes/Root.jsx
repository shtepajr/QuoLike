import { Outlet, NavLink } from 'react-router-dom';
import '../index.css';
import {
    fetchQuotableMerged,
    fetchFavoritesMerged,
    fetchArchivedMerged,
    toggleEntry,
    fetchQuotableRandom
} from '../quotes-data.js'
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import logo from '../assets/quolike-high-resolution-logo-transparent.png';

export const limit = 6;

export async function allLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const data = await fetchQuotableMerged(page, limit && 6);
    console.log('allLoader: data loaded');
    return { ...data };
}

export async function favoritesLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const data = await fetchFavoritesMerged(page, limit && 6);
    console.log('favoritesLoader: data loaded');
    return { ...data };
}

export async function archivedLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const data = await fetchArchivedMerged(page, limit && 6);
    console.log('archivedLoader: data loaded');
    return { ...data };
}

export async function homeLoader() {
    const data = await fetchQuotableRandom();
    console.log('homeLoader: data loaded');
    return { ...data };
}

export async function toggleAction({ request, params }) {
    const formData = await request.formData();
    const model = Object.fromEntries(formData);

    if (model.isFavorite !== undefined) {
        model.isFavorite = model.isFavorite === 'true';
    }
    if (model.isArchived !== undefined) {
        model.isArchived = model.isArchived === 'true';
    }
    if (formData.has('tags')) {
        model.tags = Array.isArray(model.tags) ? model.tags : [model.tags];
    }

    return await toggleEntry(model);
}

export default function Root() {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();


    const handleLogout = () => {
        logout();
    };

    const themeBgColor = theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light';

    return (
        <>
            <div className={`${themeBgColor} h-100`}>
                <header>
                    <nav className={`navbar navbar-expand-lg px-2`}>
                        <div className="container">
                            <NavLink to="/" className="navbar-brand">
                                <img src={logo} alt="Logo" width="115" />
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">QuoLike</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end align-items-center flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <NavLink to="/" className="nav-link">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={toggleTheme} className="nav-link d-flex align-items-center">
                                                {theme === 'light' ? (
                                                    <>
                                                        <span className="material-symbols-outlined me-1">
                                                            toggle_off
                                                        </span>
                                                        Light
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined me-1">
                                                            toggle_on
                                                        </span>
                                                        Dark
                                                    </>
                                                )}
                                            </button>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="material-symbols-outlined md-36">
                                                    account_circle
                                                </span>
                                                Profile
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to="profile" className="dropdown-item">
                                                        Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li>
                                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="main container">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

