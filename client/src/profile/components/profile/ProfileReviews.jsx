import React from 'react'
import { arrayOf, object, array } from 'prop-types'
import { Col, Image, Row } from 'react-bootstrap'
import ReviewFeedbeck from './ReviewFeedbeck'


const ProfileReviews = ({ reviews }) => {

    if (!reviews.length) return <Col xs={12}> <p>טרם נכתבו ביקורות</p> </Col>

    return (
        <>
        {reviews.map( (review, i) => {
            return (
                <ReviewFeedbeck key={i} i={i} review={review}/>
            )
        }) }
        </>
    )
}

ProfileReviews.propTypes = {
    review: array.isRequired
}

export default ProfileReviews