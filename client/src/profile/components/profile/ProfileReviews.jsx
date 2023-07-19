import React from 'react'
import { arrayOf, object, array } from 'prop-types'
import { Col, Image, Row } from 'react-bootstrap'

const ProfileReviews = ({ reviews = [] }) => {

    if (!reviews.length) return <Col xs={12}> <p>טרם נכתבו ביקורות</p> </Col>
    return (
        <>
        {reviews.map( (review, i) => {
            return (
                <Col className='review pt-3 pb-2' xs={12} key={i}>
                    <Row>
                        <Col className='profile-img'>
                            <div className="circle-stroke">
                                <div className="profile-image-container">
                                    <Image key={i} src={review.img} alt={review.name}/>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <p className='review-name'>{review.name}</p>
                            {Array.from(Array(review.rate), (e, i) => {
                                return <Image className='star' key={i} src='/assets/images/icons/pawllo_star.svg' alt='דירוג'/>
                            })}
                            <p className='review-content'>
                                {!review.content ? 'ללא תגובה' : review.content}
                            </p>
                        </Col>
                    </Row>
                </Col>
            )
        }) }
        </>
    )
}

ProfileReviews.propTypes = {
    review: array.isRequired
}

export default ProfileReviews