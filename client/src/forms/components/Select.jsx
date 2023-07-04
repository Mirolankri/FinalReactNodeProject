import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Select = ({ name, onChange, required, placeholder, options }) => {

  return (
    <Form.Select aria-label={name}>
      <option disabled selected>{placeholder}</option>
      {options.map( (option, i) => {
        return <option key={i} value={option.val}>{option.text}</option>
      } )}
    </Form.Select>
  )
}

Select.propTypes = {}

export default Select