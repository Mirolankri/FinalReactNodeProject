import React from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ProfileCard = ({ card, onDelete, onLike }) => {
    const navigate = useNavigate()

    return (
        <Col>
            <Container fluid>
                <Row>
                    <Col xs={1}>11</Col>
                    <Col xs={11}>11</Col>
                </Row>
            </Container>
        </Col>
    )
}

ProfileCard.propTypes = {}

export default ProfileCard