import React from 'react'
import ProfileForm from '../components/ProfileForm'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import initialProfileForm from '../helpers/initialForms/initialProfileForm'
import createUpdateProfileSchema from '../models/joi-schema/updateProfile'

const UpdateProfilePage = () => {
  // const { user_id } = useParams()
  const { value, ...rest } = useForm(initialProfileForm, createUpdateProfileSchema)

  return (
    // <ProfileForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' onSubmit={} onReset={} onFormChange={} onInputChange={} setData={} errors={} data={} />
    <ProfileForm title='בוא.י נכיר לעומק' subTitle='ספר.י לנו קצת על עצמך' />
  )
}

export default UpdateProfilePage