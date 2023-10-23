import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { getAgeFromBirth } from '../../Helpers/DateTime'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'


const AvatarDetails = ({profile,stars = 0,user}) => {
    const navigate = useNavigate()
  return (
    <>
    <Row className='profile-container d-flex justify-content-center align-items-end'>
        <Col xs={12} md={6} lg={4} className='p-4'>
          <Row className='d-flex justify-content-start align-items-center'>
            <Col className='profile-image' xs={2} onClick={()=>navigate(`/profile/walker/${user._id}`)}>
              <div className="circle-profile">
                <div className="profile-image-container">
                  <Image src='/assets/images/dog/persons/male.png' />
                </div>
              </div>
            </Col>
            <Col xs={8}>
              <h2 className='profile-name'>{`${profile.name.first} ${profile.name.last}`}</h2>
              <p>{profile.dogWalker.about }</p>
              {/* <p>{`תאריך הצטרפות: ${new Date(profile.data.createdAt).toLocaleDateString()}`}</p> */}
            </Col>
            <Col xs={1}>
              <div style={{cursor: 'pointer'}}>
                <Icon.ArrowLeftCircle size={32} onClick={()=>navigate(`${ROUTES.Appointments.Create}/${user._id}`)}/>
                <span>תאם פגישה</span>
              </div>
            
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
                דוגווקר
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
    </>
  )
}

export default AvatarDetails

