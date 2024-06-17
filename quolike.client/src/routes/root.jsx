import { useEffect, useState } from 'react';
import '../index.css';

import 'bootstrap/dist/css/bootstrap.css';

import {
    Outlet,
    NavLink,
} from "react-router-dom";

export default function Root() {
    const tabs = ['quotes', 'favorites', 'archived'];
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