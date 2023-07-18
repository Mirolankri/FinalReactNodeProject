import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Select = ({ data, name, onChange, required, options }) => {
  return (
      <Form.Select name={name} defaultValue={data[name]} onChange={onChange} aria-label="Default select example" required>
        <option selected disabled>יש לבחור אחת מהאפשרויות</option>
          {options.map( (option, i) => (
            <option key={i} value={option.val}>{ option.text }</option>
          ))}
      </Form.Select>
  )
}

Select.propTypes = {}

export default Select