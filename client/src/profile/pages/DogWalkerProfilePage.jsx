import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useWalkerProfiles from '../hooks/useWalkerProfiles'
import ROUTES from '../../routes/routesModel'
import Profile from '../components/profile/Profile'

const ProfilePage = () => {
  const { user_id } = useParams()
  const { handleGetProfile, handleGetWalkerReviews, setReviews, value: { profile, reviews } } = useWalkerProfiles()
  const navigate = useNavigate()

  const [ stars, setStars ] = useState(0)
  const [ dbProfile, setDbProfile ] = useState(null)

  const onHandleEdit = () => {
    navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)
  }
  
  useEffect( () => {
    handleGetProfile(user_id).then(data => {
      if(!data) return navigate(`${ROUTES.UPDATE_DOGWALKER}/${user_id}`)

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

      handleGetWalkerReviews(data._id).then(revData => {
        setReviews(revData)
        let sum = 0
        revData.map( (rev) => {
          sum = sum + rev.rate
          return setStars(sum / revData.length)
      })
      })
    })
  }, [] )

  if(!profile) return('Error')

  return (
    <Profile profile={dbProfile} stars={stars} reviews={reviews} handleEdit={onHandleEdit} user_id={user_id} profile_id={profile._id} kind='walker'/>
  )
}

ProfilePage.propTypes = {}

export default ProfilePage