import { Outlet, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import {
    fetchQuotableMerged,
    fetchFavoritesMerged,
    fetchArchivedMerged,
    toggleEntry
} from '../quotes-data.js'
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';


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
            <header className="header">
                <NavLink to="/">QuoLike</NavLink>
                <button onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </button>
                <NavLink to="profile">Profile</NavLink>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
}

