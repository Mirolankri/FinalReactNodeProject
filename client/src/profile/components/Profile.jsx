import React from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Image, Row } from 'react-bootstrap'
import ProfileReviews from './ProfileReviews'

const Profile = ({ profile }) => {
  
  if (!profile) return (
    <p>Error</p>
  )

  return (
    <Container dir='rtl'>
      <Row className='profile-container d-flex justify-content-between align-items-end'>
        <Col xs={12} md={7} className='p-4'>
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
              <p>{`תאריך הצטרפות: ${new Date(profile.dogWalker.createdAt).toLocaleDateString()}`}</p>
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
      <Row className='d-flex p-3 justify-content-between align-items-end'>
        <Col xs={12}>
          <h3 className='reviews'>קצת עלי</h3>
          <p>{profile.dogWalker.about}</p>
        </Col>
      </Row>

      <Row className='p-3'>
        <Col xs={12}>
          <h3 className='reviews'>ביקורות</h3>
        </Col>

        <ProfileReviews reviews={[{name: 'בן קרקובסקי', rate: 3,img:'/assets/images/dog/persons/male.png', content:'WOWOWOWOWOWO WOWOWOWOWOW WOWOWOWOWOW'},{name: 'בן קרקובסקי', rate: 3, content:'WOWOWOWOWOWO WOWOWOWOWOW'},{name: 'בן קרקובסקי', rate: 3, content:'WOWOWOWOWOWO WOWOWOWOWOW'}]} />
      </Row>
    </Container>
  )
}

Profile.propTypes = {}

export default Profile