// import React from 'react'
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import ClientProfile from '../pages/ClientProfile'
// import RequireAuth from './RequireAuth'
// import Main from '../components/layout/Main'
// import IntakeForm from '../pages/IntakeForm'
// import ClientEntryForm from '../pages/ClientEntryForm'
// import { Route, Routes } from 'react-router-dom'
// import ClientSummary from '../pages/ClientSummary'
// import Clients from '../pages/Clients'
// import ClientVisits from '../pages/ClientVisits'
// import Billing from '../pages/Billing'
// import AdminAuth from './AdminAuth'
// import UserManagement from '../pages/UserManagement'
// import UploadTypes from '../pages/UploadTypes'
// import Reports from '../pages/Reports'
// import Audits from '../pages/Audits'
// import ForgotPassword from '../pages/ForgotPassword'
// import ResetPassword from '../pages/ResetPassword'
// import CheckAuth from './CheckAuth'
// import DischargeForm from '../pages/DischargeForm'
// import ProfileAttachment from '../pages/ProfileAttachment'

// export default function AppRoutes() {
//     return (
//         <Routes>
//             <Route element={<CheckAuth />}>
//                 <Route index path="/" exact element={<Login />} />
//                 <Route index path="/login" exact element={<Login />} />
//                 <Route index path="/forgot-password" exact element={<ForgotPassword />} />
//                 <Route index path="/reset-password" exact element={<ResetPassword />} />
//             </Route>

//             <Route element={<RequireAuth> <Main /> </RequireAuth>}>
//                 <Route exact path="/dashboard" element={<Home />} />
//                 <Route exact path="/clients" element={<Clients />} />
//                 <Route exact path="/client/new" element={<ClientEntryForm />} />
//                 <Route exact path="/client/profile/:id" element={<ClientEntryForm />} />
//                 <Route exact path="/client/visits" element={<ClientVisits />} />
//                 <Route exact path="/client/:id" element={<ClientProfile />} />/
//                 <Route exact path="/client/intake/:id" element={<IntakeForm />} />
//                 <Route exact path="/intake/:id/:intakeId" element={<IntakeForm />} />
//                 <Route exact path="/client/summary/:clientId/:id" element={<ClientSummary />} />
//                 <Route exact path="/discharge/:statusId/:clientId/:intakeId" element={<DischargeForm />} />
//                 <Route exact path="/billing" element={<Billing />} />
//                 <Route exact path="/reports" element={<Reports />} />
//                 <Route exact path="/profile/attachment/:clientId" element={<ProfileAttachment />} />
//             </Route>

//             <Route element={<AdminAuth> <Main /> </AdminAuth>}>
//                 <Route exact path="/usermanagement" element={<UserManagement />} />
//                 <Route exact path="/uploadtypes" element={<UploadTypes />} />
//                 <Route exact path="/audits" element={<Audits />} />
//             </Route>
//         </Routes>
//     )
// }


import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import CheckAuth from "./CheckAuth";
import Dashboard from "../pages/Dashboard";
import Profile from "../components/Profile";
import Friends from "../components/Friends";

// import Login from "components/auth/Login";
// import Register from "components/auth/Register";
// import Layout from "components/layout";
// import Dashboard from "components/dashboard";
// import Comments from "components/comments";
// import Profile from "components/profile";
// import Users from "components/users";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const FRIENDS = "/protected/friends";
// export const PROFILE = "/protected/profile/:id";
export const PROFILE = "/protected/profile";
// export const COMMENTS = "/protected/comments/:id";

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
    //   {
    //     path: COMMENTS,
    //     element: <Comments />,
    //   },
    ],
  },
]);