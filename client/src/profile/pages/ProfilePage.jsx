import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useProfiles from '../hooks/useProfiles'
import { Container } from 'react-bootstrap'

const ProfilePage = () => {
  const { user_id } = useParams()
  
  const { handleGetProfile, value: { profile } } = useProfiles()
  
  useEffect( () => {
    handleGetProfile(user_id)
  }, [] )

  if(!profile) return (
    <h1> אופס... נראה שמשהו השתבש </h1>
  )
  
  return (
    <Container dir='rtl'>
      <h1>שלום {profile.name.first}</h1>

    </Container>

  )
}

ProfilePage.propTypes = {}

export default ProfilePage