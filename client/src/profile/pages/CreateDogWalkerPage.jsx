import React, { useEffect } from 'react'
import ProfileWalkerForm from '../components/ProfileWalkerForm'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import initialProfileForm from '../helpers/initialForms/initialProfileForm'
import updateProfileWalkerSchema from '../models/joi-schema/updateProfile'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import useProfiles from '../hooks/useProfiles'
import BlankPage from '../../users/pages/BlankPage'

const CreateDogWalkerPage = () => {
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleUpdateProfile } = useProfiles()
  const navigate = useNavigate()

  const { value, ...rest } = useForm(initialProfileForm, updateProfileWalkerSchema, ()=>{
    handleUpdateProfile(value.data, user_id)
  })

  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />
  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />
  
  return (
    <BlankPage>
      <ProfileWalkerForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data} />
    </BlankPage>
  )
}

export default CreateDogWalkerPage