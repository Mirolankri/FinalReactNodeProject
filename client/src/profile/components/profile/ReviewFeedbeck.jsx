import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Image, Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import useWalkerProfiles from '../../hooks/useWalkerProfiles'

const ReviewFeedbeck = ({ review, i }) => {
    const [data, setData] = useState({name: { first: '',last: '' }})
    const { handleGetDataForReviewa } = useWalkerProfiles()

    useEffect( () => {
        handleGetDataForReviewa(review.user_id).then(data => {
            setData(data)
        })
    }, [] )
    
    if(!review) return 
    if(!data) return 

    return (
        <Col className='review pt-3 pb-2' xs={12} key={i}>
            <Row>
                <Col className='profile-img'>
                    <div className="circle-stroke">
                        <div className="profile-image-container">
                            <Image key={i} src={data.img} alt='תמונת פרופיל'/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <p className='review-name'>{data.name.first} {data.name.last}</p>
                    {Array.from(Array(review.rate), (e, i) => {
                        return <Icon.StarFill color='#ff8a00' key={i} size={14} className='mb-1' />
                    })}
                    <p className='review-content'>
                        {!review.content ? 'ללא תגובה' : review.content}
                    </p>
                    <p className='rev-date'>{new Date(review.createdAt).toLocaleDateString()}</p>
                </Col>
            </Row>
        </Col>
    )
}

ReviewFeedbeck.propTypes = {}

export default ReviewFeedbeck