import React from 'react'
import PropTypes from 'prop-types'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const Input = ({ type, id, label, style }) => {
    return (
        <>
        <FloatingLabel controlId={id} label={label} style={style}>
            <Form.Control type={type} placeholder={label} />
        </FloatingLabel>
        </>
    )
}

Input.propTypes = {}

export default Input