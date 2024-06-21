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
    favoriteAction
} from './routes/root.jsx';
import Tab from './routes/tab.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        action: () => { console.log('action called'); },
        children: [
            //{ index: true, element: <Index /> },
            {
                path: "all",
                element: <Tab />,
                loader: allLoader,
                action: () => { console.log('action called'); },
                children: [
                    {
                        path: "create",
                        action: favoriteAction,
                    },
                    {
                        path: "edit",
                        action: favoriteAction,
                    }
                ]
            },
            {
                path: "favorites",
                element: <Tab />,
                loader: favoritesLoader,
                action: () => { console.log('action called'); }
            },
            {
                path: "archived",
                element: <Tab />,
                loader: archivedLoader,
                action: () => { console.log('action called'); }
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
