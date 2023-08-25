// NEW

import React, { useEffect } from 'react'
import ProfileWalkerForm from '../components/ProfileWalkerForm'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import useOwnerProfile from '../hooks/useOwnerProfile'
import initialProfileOwnerForm from '../helpers/initialForms/initialProfileOwnerForm'
import updateProfileOwnerSchema from '../models/joi-schema/updateProfileOwnerSchema'
import mapProfileToModelOwner from '../helpers/normalization/mapToModelOwner'

const UpdateDogOwnerPage = () => {
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleGetProfile, handleUpdateProfile } = useOwnerProfile()
  const navigate = useNavigate()

  const { value, ...rest } = useForm(initialProfileOwnerForm, updateProfileOwnerSchema, () => {
    handleUpdateProfile(value.data, user_id, 'walker')
  })

  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(!data) return navigate(`${ROUTES.CREATE_DOGWALKER}/${user_id}`)
      const modeledProfile = mapProfileToModelOwner(data)
      rest.setData(modeledProfile)
      rest.setResetData(modeledProfile)
    })
  }, [] )

  if(!userData) return <Navigate replace to={ROUTES.LOGIN} />

  return (
      <ProfileWalkerForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} data={value.data} />
  )
}

export default UpdateDogOwnerPage