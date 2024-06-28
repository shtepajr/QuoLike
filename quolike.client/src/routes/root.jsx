import { useEffect, useState } from 'react';
import { Outlet, NavLink, redirect, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import {
    fetchQuotableMerged,
    fetchFavoritesMerged,
    fetchArchivedMerged,
    toggleEntry
} from '../quotes-data.js'

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

    return await toggleEntry(model);
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
            </main>
        </>
    );
}

