import { createBrowserRouter } from "react-router-dom";
import Friends from "../components/Friends";
import Profile from "../components/Profile";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../pages/Dashboard";
import CheckAuth from "./CheckAuth";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const FRIENDS = "/protected/friends";
export const PROFILE = "/protected/profile";

export const router = createBrowserRouter([
  { path: ROOT, element: "Public Root" },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <CheckAuth />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
        // element: 'Dashboard',
      },
      {
        path: FRIENDS,
        element: <Friends />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
    
    ],
  },
]);