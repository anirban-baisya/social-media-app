import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-Auth";
import { LOGIN } from "./AppRoutes";
import { useEffect, useState } from "react";

function CheckAuth({ children }) {
    // let auth = useAuth();

    // if (auth.user) {
    //     return <Navigate to="/dashboard" replace />;
    // }
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && pathname.startsWith("/protected") && !user) {
            navigate(LOGIN);
        }
    }, [pathname, user, isLoading]);

    if (isLoading) return "Loading auth user...";

    return <>

         <Outlet />;
    </>
}

export default CheckAuth;