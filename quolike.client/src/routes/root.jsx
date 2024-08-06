import { Outlet, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
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
import logo from '../assets/quolike-high-resolution-logo-white-transparent.png';


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

    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <img src={logo} alt="Logo" width="150" />
                        </NavLink>
                        <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        </div>
                        <div className="d-flex flex-wrap justify-content-center">
                            <button onClick={toggleTheme} className="d-flex align-items-center btn btn-outline-secondary me-2">
                                {theme === 'light' ? (
                                    <>
                                        <span className="material-symbols-outlined">
                                            toggle_off
                                        </span>
                                        Light
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">
                                            toggle_on
                                        </span>
                                        Dark
                                    </>
                                )}
                            </button>
                            <div className="dropdown">
                                <button className="d-flex align-items-center btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="material-symbols-outlined md-36">
                                        account_circle
                                    </span>
                                    Profile
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="profile" className="dropdown-item">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="container overflow-hidden">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

