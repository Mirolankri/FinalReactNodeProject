import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Text = ({ type, name, onChange, required, placeholder }) => {
  return (
    <Form.Control type={type} name={name} onChange={onChange} required={required} placeholder={placeholder} aria-describedby={name} />
  )
}

Text.propTypes = {}

export default Text