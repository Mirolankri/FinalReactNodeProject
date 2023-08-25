import React, { useEffect } from 'react'
import ProfileWalkerForm from '../components/ProfileWalkerForm'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import initialProfileWalkerForm from '../helpers/initialForms/initialProfileWalkerForm'
import updateProfileWalkerSchema from '../models/joi-schema/updateProfileWalkerSchema'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import useWalkerProfiles from '../hooks/useWalkerProfiles'
import mapProfileToModel from '../helpers/normalization/mapToModelProfile'

const CreateDogWalkerPage = () => {
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleUpdateProfile, handleGetProfile } = useWalkerProfiles()
  
  const navigate = useNavigate()

  const { value, ...rest } = useForm(initialProfileWalkerForm, updateProfileWalkerSchema, ()=>{
    handleUpdateProfile(value.data, user_id, 'walker')
  })

  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(data && data.dogWalker) return navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
      if(data) {
        const modeledProfile = mapProfileToModel(data)
        rest.setData(modeledProfile)
        rest.setResetData(modeledProfile)
      }
    })
  }, [])

  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />
  
  return (
    <ProfileWalkerForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data} />
  )
}

export default CreateDogWalkerPage