import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useProfiles from '../hooks/useProfiles'
import ROUTES from '../../routes/routesModel'
import Profile from '../components/profile/Profile'
import { useUser } from '../../users/providers/UserProvider'

const ProfilePage = () => {
  const { user_id } = useParams()
  const { handleGetProfile, value: { profile } } = useProfiles()
  const navigate = useNavigate()
  
  useEffect( () => {
    console.log(user_id);
    handleGetProfile(user_id).then(data => {
      if(!data) return navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
    })
  }, [] )

  return (
    <Profile profile={profile} kind='walker'/>
  )
}

ProfilePage.propTypes = {}

export default ProfilePage