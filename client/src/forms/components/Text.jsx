import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Text = ({ type, name, onChange, required, placeholder,data }) => {
  return (
    <Form.Control value={data} type={type} name={name} onChange={onChange} required={required} placeholder={placeholder} aria-describedby={name} />
  )
}

Text.propTypes = {}

export default Text