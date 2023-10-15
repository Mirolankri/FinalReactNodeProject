import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import ProfileReviews from './ProfileReviews'
import * as Icon from 'react-bootstrap-icons'
import useWalkerProfiles from '../../hooks/useWalkerProfiles'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import { getAgeFromBirth } from '../../../Helpers/DateTime'

const Profile = ({ profile, reviews, user_id, stars, handleEdit, kind }) => {
  const navigate = useNavigate()
  const handleAddReview = () => {
    navigate(`${ROUTES.REVIEW_ADD}/${profile.data._id}`)
  }
  
  if (!profile) return (
    // <p>Error</p>
    <></>
  )

  return (
    <Container dir='rtl'>
      <Row className='profile-container position-relative'>
        <Col className='d-flex justify-content-end pt-2 position-absolute'>
          {(user_id === profile.user_id) ? <Button variant="orange" style={{width: '100%', maxWidth: '200px'}} onClick={handleEdit}><Icon.PencilFill/> עריכת פרופיל</Button> : ''}
        </Col>
      </Row>
      <Row className='profile-container d-flex justify-content-between align-items-end'>
        <Col xs={12} md={6} lg={8} className='p-4'>
          <Row className='d-flex justify-content-start align-items-center'>
            <Col className='profile-image'>
              <div className="circle-profile">
                <div className="profile-image-container">
                  <Image src='/assets/images/dog/persons/male.png' />
                </div>
              </div>
            </Col>
            <Col>
              <h2 className='profile-name'>{`${profile.name.first} ${profile.name.last}`}</h2>
              <p>{`תאריך הצטרפות: ${new Date(profile.data.createdAt).toLocaleDateString()}`}</p>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Row className='profile-details p-3 d-flex justify-content-start align-items-center'>
            <Col xs={3}>
              <div className="profile-tags">
                <Icon.StarFill color='#ff8a00' size={24} className='mb-1' />
                {stars === 0 ? '-' : stars.toFixed(1)}
              </div>
            </Col>
            <Col xs={3}>
              <div className="profile-tags">
                <Icon.GeoAltFill color='#8668ff' size={24} className='mb-1' />
                {profile.address.city}
              </div>
            </Col>
            <Col xs={3}>
              <div className="profile-tags">
                <Icon.PersonLinesFill color='#ff8a00' size={24} className='mb-1' />
                {(kind === 'walker') ? 'דוגווקר' : 'בעלים'}
              </div>
            </Col>
            <Col xs={3}>
              <div className="profile-tags">
                <Icon.PersonBadgeFill color='#8668ff' size={24} className='mb-1' />
                { `${profile.gender === 'male' ? 'בן' : profile.gender === 'female' ? 'בת' :''} ${getAgeFromBirth(profile.birth)}`}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='d-flex p-3 justify-content-between align-items-end'>
        <Col xs={12}>
          <h3 className='reviews'>קצת עלי</h3>
          <p>{profile.data.about}</p>
        </Col>
      </Row>

      <Row className='p-3'>
        <Col xs={12}>
          <h3 className='reviews'>ביקורות</h3>
        </Col>

        <ProfileReviews onAddReview={handleAddReview} reviews={reviews ? reviews : []} />
      </Row>
    </Container>
  )
}

Profile.propTypes = {}

export default Profile