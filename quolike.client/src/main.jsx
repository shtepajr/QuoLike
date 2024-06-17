import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// my
import './index.css'
import ErrorPage from "./error-page";
import Root from './routes/root.jsx'
import Index, { loader as indexLoader } from './routes/index.jsx';
import Favorites, { loader as favoritesLoader } from './routes/favorites.jsx';
import Archived, { loader as archivedLoader } from './routes/archived.jsx';

export const limit = 6;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        action: () => { console.log('action called'); },
        children: [
            //{ index: true, element: <Index /> },
            { path: "quotes", element: <Index />, loader: indexLoader, action: () => { console.log('action called'); } },
            { path: "favorites", element: <Favorites />, loader: favoritesLoader, action: () => { console.log('action called'); } },
            { path: "archived", element: <Archived />, loader: archivedLoader, action: () => { console.log('action called'); } },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
