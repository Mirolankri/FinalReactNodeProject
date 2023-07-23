import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import useWalkerProfiles from '../hooks/useWalkerProfiles'
import mapProfileToModel from '../helpers/normalization/mapToModelProfile'
import initialProfileOwnerForm from '../helpers/initialForms/initialProfileOwnerForm'
import updateProfileOwnerSchema from '../models/joi-schema/updateProfileOwnerSchema'
import ProfileOwnerForm from '../components/ProfileOwnerForm'

const CreateDogOwnerPage = () => {
  const [walkerData, setWalkerData] = useState({})
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleUpdateProfile, handleGetProfile } = useWalkerProfiles()
  const navigate = useNavigate()

  const { value, ...rest } = useForm(initialProfileOwnerForm, updateProfileOwnerSchema, ()=>{
    handleUpdateProfile(value.data, user_id, 'owner')
  })

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
    <ProfileOwnerForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data} />
  )
}

export default CreateDogOwnerPage