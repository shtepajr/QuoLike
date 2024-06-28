import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// my
import './index.css';
import ErrorPage from "./error-page";
import Root, {
    allLoader,
    favoritesLoader,
    archivedLoader,
    toggleAction
} from './routes/root.jsx';
import Tab from './routes/tab.jsx';
import Index from './routes/index.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        action: () => { console.log('action called'); },
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: "all/:page?",
                element: <Tab />,
                loader: allLoader,
                action: () => { console.log('action called'); },
                children: [
                    {
                        path: "toggle",
                        action: toggleAction,
                    }
                ]
            },
            {
                path: "favorites/:page?",
                element: <Tab />,
                loader: favoritesLoader,
                action: () => { console.log('action called'); },
                children: [
                    {
                        path: "toggle",
                        action: toggleAction,
                    }
                ]
            },
            {
                path: "archived/:page?",
                element: <Tab />,
                loader: archivedLoader,
                action: () => { console.log('action called'); },
                children: [
                    {
                        path: "toggle",
                        action: toggleAction,
                    }
                ]
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
