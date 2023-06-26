import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../users/pages/Login';
import Billing from '../components/Billing';
import Signup from '../users/pages/Signup';
import PhoneVerify from '../components/PhoneVerify';
import Profile from '../users/pages/Profile';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/Billing' element={<Billing />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/phone/verify' element={<PhoneVerify />} />
        </Routes>
    )
}

export default Router