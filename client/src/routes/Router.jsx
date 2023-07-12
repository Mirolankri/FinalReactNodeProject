import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../users/pages/Login';
import Billing from '../components/Billing';
import Signup from '../users/pages/Signup';
import PhoneVerify from '../users/pages/PhoneVerify';
// import { useUser } from "../users/providers/UserProvider";
import { useUser } from '../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import BlankPage from '../users/pages/BlankPage';
import ErrorPage from '../components/ErrorPage';
import ROUTES from './routesModel';
import ProfilePage from '../profile/pages/ProfilePage';
import UpdateProfilePage from '../profile/pages/UpdateProfilePage';
function Router() {
    // const {userData} = useUser()
    // const navigate = useNavigate()

    // useEffect( () => {
    //     console.log("useEffect in Router.js",userData);
    //     // console.log(["/login"].includes(window.location.pathname));

    // if(!userData && !["/register","/login"].includes(window.location.pathname)) return navigate("/login")
       
    //   }, [userData]);

    return (
        <Routes>
            {/* <Route path='/' element={<LoginTest />} /> */}
            <Route exact path={ROUTES.ROOT} element={<Dashboard />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path={`${ROUTES.UPDATE_PROFILE}/:user_id`} element={<UpdateProfilePage />} />
            <Route path={`${ROUTES.PROFILE}/:user_id`} element={<ProfilePage />} />
            <Route path='/Billing' element={<Billing />} />
            <Route path='/phone/verify' element={<PhoneVerify />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default Router