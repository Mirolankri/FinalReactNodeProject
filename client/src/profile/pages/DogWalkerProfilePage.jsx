import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useWalkerProfiles from '../hooks/useWalkerProfiles'
import ROUTES from '../../routes/routesModel'
import Profile from '../components/profile/Profile'
import { useUser } from '../../users/providers/UserProvider'

const ProfilePage = () => {
  const { user_id } = useParams()
  const { userData } = useUser()
  const { handleGetProfile, handleGetWalkerReviews, setReviews, value: { profile, reviews } } = useWalkerProfiles()
  const navigate = useNavigate()

  const [ stars, setStars ] = useState(0)
  const [ dbProfile, setDbProfile ] = useState(null)

  const onHandleEdit = () => {
    navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
  }
  
  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(!data) return (
        <p>No Profile</p>
      )
      
      const walkerProfile = {
        name: data.name,
        birth: data.birth,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        user_id: data.user_id,
        data: data.dogWalker
      }

      setDbProfile(walkerProfile)

      handleGetWalkerReviews(data.dogWalker._id).then(revData => {
        setReviews(revData)
        let sum = 0
        revData.map( (rev) => {
          sum = sum + rev.rate
          return setStars(sum / revData.length)
      })
      })
    })
  }, [user_id] )

  if(!profile) return('Error22222')

  return (
    <Profile profile={dbProfile} stars={stars} reviews={reviews} handleEdit={onHandleEdit} user_id={userData._id} profile_id={profile._id} kind='walker'/>
  )
}

export default ProfilePage