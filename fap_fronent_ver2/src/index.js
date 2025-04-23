import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SysAdminProfile from './pages/sys_admin/sysAdminProfile';
import SysAdminAccountManage from './pages/sys_admin/sysAdminAccountManage';
import '../src/styles/sysAdmin.css';

import Login from '../src/pages/auth/login/login';
import FeidLogin from './pages/auth/feidLogin/FeidLogin';
import ForgotPass from './pages/auth/forgotPassword/forgotPassword';
import CheckOtp from './pages/auth/forgotPassword/CheckOtp';
import ResetPass from './pages/auth/forgotPassword/ResetPass';
import '../src/styles/auth.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="603890642596-d90t7ff6lqhdn8i0t4bb4ej2n13n2l5l.apps.googleusercontent.com">
            <BrowserRouter>
                <Routes>
                    <Route path="/fap" element={<Login />} />
                    <Route path="/fap/FeidLogin" element={<FeidLogin />} />
                    <Route path="/fap/ForgotPass" element={<ForgotPass />} />
                    <Route path="/fap/CheckOtp" element={<CheckOtp />} />
                    <Route path="/fap/ResetPass" element={<ResetPass />} />
                    <Route path="/fap/SysAdmin/Profile" element={<SysAdminProfile />} />
                    <Route path="/fap/SysAdmin/AccountManage" element={<SysAdminAccountManage />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);