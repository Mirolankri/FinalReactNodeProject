import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../components/Dashboard'
import Login from '../users/pages/Login'
import Billing from '../components/Billing'
import Signup from '../users/pages/Signup'
import PhoneVerify from '../users/pages/PhoneVerify'
import ErrorPage from '../components/ErrorPage'
import ROUTES from './routesModel'
import DogWalkerProfilePage from '../profile/pages/DogWalkerProfilePage'
import UpdateDogWalkerPage from '../profile/pages/UpdateDogWalkerPage'
import CreateDogWalkerPage from '../profile/pages/CreateDogWalkerPage'
import CreateProfileReview from '../profile/pages/CreateProfileReview'
import UploadProfileImagePage from '../profile/pages/UploadProfileImagePage'
import CreateDogOwnerPage from '../profile/pages/CreateDogOwnerPage'
import DogOwnerProfilePage from '../profile/pages/DogOwnerProfilePage'
import UpdateDogOwnerPage from '../profile/pages/UpdateDogOwnerPage'
import {  DogsPage } from '../dogs/pages/DogsPage'
import { DogAdd } from '../dogs/pages/DogAdd'
import Table from '../components/Table/Table'
import { TableBS } from '../components/Table/TableBS'

function Router() {
    return (
        <Routes>
            {/* <Route exact path={ROUTES.ROOT} element={<Table />} /> */}
            <Route exact path={ROUTES.ROOT} element={<Dashboard />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path={`${ROUTES.REVIEW_ADD}/:profile_id`} element={<CreateProfileReview />} />
            <Route path={`${ROUTES.CREATE_DOGWALKER}/:user_id`} element={<CreateDogWalkerPage />} />
            <Route path={`${ROUTES.UPDATE_DOGWALKER}/:user_id`} element={<UpdateDogWalkerPage />} />
            <Route path={`${ROUTES.PROFILE_WALKER}/:user_id`} element={<DogWalkerProfilePage />} />
            <Route path={`${ROUTES.UPDATE_PROFILE_IMAGE}/:user_id`} element={<UploadProfileImagePage />} />
            <Route path={`${ROUTES.CREATE_DOGOWNER}/:user_id`} element={<CreateDogOwnerPage />} />
            <Route path={`${ROUTES.PROFILE_OWNER}/:user_id`} element={<DogOwnerProfilePage />} />
            <Route path={`${ROUTES.UPDATE_DOGOWNER}/:user_id`} element={<UpdateDogOwnerPage />} />
            <Route path='/Billing' element={<Billing />} />
            <Route path={ROUTES.DOGS}  >
                <Route path='add' element={<DogAdd />} />
                <Route path={`update/:DogID`} element={<DogAdd />} />
                <Route path='list' element={<Table />} />
            </Route>
            <Route path='/phone/verify' element={<PhoneVerify />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default Router