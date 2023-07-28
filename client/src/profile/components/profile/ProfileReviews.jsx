import React from 'react'
import { arrayOf, object, array } from 'prop-types'
import { Button, Col, Image, Row } from 'react-bootstrap'
import ReviewFeedbeck from './ReviewFeedbeck'
import * as Icon from 'react-bootstrap-icons'

const ProfileReviews = ({ reviews, onAddReview }) => {

    if (!reviews.length) return (
        <>
            <Button variant="orange" style={{width: '100%', maxWidth: '200px'}} onClick={onAddReview}><Icon.PencilFill/> כתיבת ביקורת</Button>
            <p>טרם נכתבו ביקורות</p>
        </>)

    return (
        <>
        <Button variant="orange" style={{width: '100%', maxWidth: '200px'}} onClick={onAddReview}><Icon.PencilFill/> כתיבת ביקורת</Button>
        {reviews.map( (review, i) => {
            return (
                <ReviewFeedbeck key={i} i={i} review={review}/>
            )
        }) }
        </>
    )
}

ProfileReviews.propTypes = {
    review: array
}

export default ProfileReviews