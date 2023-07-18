import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import useProfiles from '../hooks/useProfiles'
import { Col, Container, Image, Row } from 'react-bootstrap'
import ROUTES from '../../routes/routesModel'

const ProfilePage = () => {
  const { user_id } = useParams()
  const { handleGetProfile, value: { profile } } = useProfiles()
  const navigate = useNavigate()
  
  useEffect( () => {
    handleGetProfile(user_id)
  }, [] )

  if(!profile) return navigate(`${ROUTES.CREATE_DOGWALKER}/${user_id}`)
  
  return (
    <Container dir='rtl'>
      <Row className='profile-container d-flex justify-content-between align-items-end'>
        <Col xs={12} md={7} className='p-4'>
          <Row className='d-flex justify-content-start align-items-center'>
            <Col className='profile-image'>
              <div className="circle-profile">
                <div className="profile-image-container">
                  <Image src={(profile.gender === 'male') ? '/assets/images/dog/persons/male.png' : '/assets/images/dog/persons/female.png'} />
                </div>
              </div>
            </Col>
            <Col>
              <h2 className='profile-name'>{`${profile.name.first} ${profile.name.last}`}</h2>
              <p>{`נרשם בתאריך: ${new Date(profile.dogWalker.createdAt).toLocaleDateString()}`}</p>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={3}>
          <Row className='profile-details p-3 d-flex justify-content-start align-items-center'>
            <Col xs={6}>
              <div className="profile-tags">
                <Image src='/assets/images/icons/pawllo_star.svg' alt='מיקום'/>
                {!profile.dogWalker.rate.length ? `${profile.name.first} עוד לא קיבל דירוג` : profile.dogWalker.rate}
              </div>
            </Col>
            <Col xs={6}>
              <div className="profile-tags">
                <Image src='/assets/images/icons/pawllo_location.svg' alt='מיקום'/>
                {profile.address.city}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='d-flex justify-content-between align-items-end pt-3'>
        <Col xs={12}>
          <p>{profile.dogWalker.about}</p>
        </Col>
      </Row>
    </Container>

  )
}

ProfilePage.propTypes = {}

export default ProfilePage