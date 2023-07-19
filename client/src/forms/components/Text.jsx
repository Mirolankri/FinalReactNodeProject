import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Text = ({ type, name, onChange, required, placeholder, data, isTextArea }) => {
  return (
    <Form.Control rows={isTextArea ? 3 : 1} as={isTextArea ? 'textarea' : 'input'} type={type} name={name} defaultValue={data[name] ? data[name] : ""} onChange={onChange} required placeholder={placeholder} aria-describedby={name} />
  )
}

Text.propTypes = {}

export default Text