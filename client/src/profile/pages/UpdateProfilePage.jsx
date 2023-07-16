import React, { useEffect } from 'react'
import ProfileForm from '../components/ProfileForm'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import initialProfileForm from '../helpers/initialForms/initialProfileForm'
import createUpdateProfileSchema from '../models/joi-schema/updateProfile'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import useProfiles from '../hooks/useProfiles'
import mapProfileToModel from '../helpers/normalization/mapToModel'
import BlankPage from '../../users/pages/BlankPage'
import normalizeProfile from '../helpers/normalization/normalizeProfile'

const UpdateProfilePage = () => {
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleGetProfile, handleUpdateProfile } = useProfiles()

  const { value, ...rest } = useForm(initialProfileForm, createUpdateProfileSchema, () => {
    handleUpdateProfile({...normalizeProfile( {...value.data} )} ,user_id)
  })

  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(!data) return
      const modeledProfile = mapProfileToModel(data)
      rest.setData(modeledProfile)
    })
  }, [] )

  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />

  return (
    <BlankPage>
      <ProfileForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data} />
    </BlankPage>
  )
}

export default UpdateProfilePage