import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useWalkerProfiles from '../hooks/useWalkerProfiles'
import ROUTES from '../../routes/routesModel'
import Profile from '../components/profile/Profile'

const ProfilePage = () => {
  const { user_id } = useParams()
  const { handleGetProfile, value: { profile } } = useWalkerProfiles()
  const navigate = useNavigate()

  const onHandleEdit = () => {
    navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
  }
  
  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(!data) return navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
    })
  }, [] )

  if(!profile) return('Error')

  return (
    <Profile profile={profile} handleEdit={onHandleEdit} user_id={user_id} profile_id={profile._id} kind='walker'/>
  )
}

ProfilePage.propTypes = {}

export default ProfilePage