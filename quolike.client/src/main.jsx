import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    BrowserRouter,
    createRoutesFromElements,
    Outlet,
    Routes,
    Route,
    RouterProvider
} from "react-router-dom";
import './index.css';
import ErrorPage from "./routes/Error";
import Root, {
    allLoader,
    favoritesLoader,
    archivedLoader,
    toggleAction
} from './routes/Root';
import Tabs from './routes/Tabs';
import Tab from './routes/Tab';
import HomePage from './routes/Home';
import ProfilePage, { profileLoader } from './routes/Profile';
import { LoginPage } from './routes/Login';
import { RegisterPage } from './routes/Register';
import { AuthLayout } from './routes/AuthLayout';
import { ProtectedLayout } from "./routes/ProtectedLayout";
import { CheckEmailPage } from "./routes/CheckEmail";
import { ForgotPasswordPage } from "./routes/ForgotPassword";
import { ResetPasswordPage, resetPasswordLoader } from "./routes/ResetPassword";
import { ResetPasswordSuccessPage } from "./routes/ResetPasswordSuccess";
import { ResendConfirmationEmailPage } from "./routes/ResendConfirmationEmail";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                    <Route index element={<HomePage />} />
                    <Route element={<Tabs />}>
                        <Route path="all/:page?" element={<Tab />} loader={allLoader}>
                            <Route path="toggle" action={toggleAction}></Route>
                        </Route>
                        <Route path="favorites/:page?" element={<Tab />} loader={favoritesLoader}>
                            <Route path="toggle" action={toggleAction}></Route>
                        </Route>
                        <Route path="archived/:page?" element={<Tab />} loader={archivedLoader}>
                            <Route path="toggle" action={toggleAction}></Route>
                        </Route>
                    </Route>
                    <Route path="profile" element={<ProfilePage />} loader={profileLoader} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkEmail" element={<CheckEmailPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword/:email?/:resetCode?" element={<ResetPasswordPage />} loader={resetPasswordLoader} />
            <Route path="/resetPasswordSuccess" element={<ResetPasswordSuccessPage />} />
            <Route path="/resendConfirmationEmail" element={ <ResendConfirmationEmailPage />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);