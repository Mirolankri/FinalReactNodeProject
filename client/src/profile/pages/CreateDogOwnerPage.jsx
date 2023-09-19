import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../users/providers/UserProvider'
import useOwnerProfile from '../hooks/useOwnerProfile'
import initialProfileOwnerForm from '../helpers/initialForms/initialProfileOwnerForm'
import useForm from '../../forms/hooks/useForm'
import ROUTES from '../../routes/routesModel'
import mapProfileToModel from '../helpers/normalization/mapToModelProfile'
import ProfileOwnerForm from '../components/ProfileOwnerForm'
import updateProfileOwnerSchema from '../models/joi-schema/updateProfileOwnerSchema'

const CreateDogOwnerPage = () => {
    const { user_id } = useParams()
    const { userData } = useUser()
    const { handleUpdateProfile, handleGetProfile } = useOwnerProfile()
    const navigate = useNavigate()

    const { value, ...rest } = useForm(initialProfileOwnerForm, updateProfileOwnerSchema, ()=>{
        console.log(value);
        handleUpdateProfile(value.data, user_id, 'owner')
    })
console.log(value);
    useEffect( () => {
        handleGetProfile(user_id).then(data => {
            if(data && data.dogOwner) return navigate(`${ROUTES.UPDATE_DOGOWNER}/${user_id}`)
            if(data) {
                const modeledProfile = mapProfileToModel(data)
                rest.setData(modeledProfile)
                rest.setResetData(modeledProfile)
            }
        })
    }, [])

    if(!userData) return <Navigate replace to={ROUTES.LOGIN} />
      

    return (
        <ProfileOwnerForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data}/>
    )
}

CreateDogOwnerPage.propTypes = {}

export default CreateDogOwnerPage