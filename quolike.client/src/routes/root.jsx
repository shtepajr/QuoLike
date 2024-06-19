import { useEffect, useState } from 'react';
import { Outlet, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import { fetchQuotableMerged, fetchFavoritesMerged } from '../quotes.js'

export const limit = 6;

export async function allLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const data = await fetchQuotableMerged(page, limit && 6);

    return { ...data };
}

export async function favoritesLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1;

    const data = await fetchFavoritesMerged(page, limit && 6);

    return { ...data };
}

export async function archivedLoader({ request }) {
    const favoriteQuotes = await fetchArchived();
    return { results: favoriteQuotes, totalPages: favoriteQuotes.totalPages };
}

export default function Root() {
    const tabs = ['all', 'favorites', 'archived'];
    return (
        <>
            <header className="header">
                <a>Logo</a>
                <button>Dark mode</button>
                <button>Profile</button>
            </header>
            <main className="main">
                <nav>
                    <ul className="nav nav-tabs">
                        {tabs.map((tab) => {
                            return (
                                <li key={tab} className="nav-item">
                                    <NavLink
                                        to={`${tab}`}
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
            </main>
        </>
    );
}

