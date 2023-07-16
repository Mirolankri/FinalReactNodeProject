import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

const Select = ({ data, name, onChange, required, placeholder, options }) => {
  return (
      //   <Form.Check // prettier-ignore
      //     type='radio'
      //     id={`${option.val}`}
      //     label={`${option.text}`}
      //     name={name}
      //     checked={data[name] === option.val}
      // />
      <Form.Select name={name} onChange={onChange} aria-label="Default select example">
        <option selected disabled>יש לבחור אחת מהאפשרויות</option>
          {options.map( (option) => (
            <option selected={data[name] === option.val} value={option.val}>{ option.text }</option>
          ))}
      </Form.Select>
  )
}

Select.propTypes = {}

export default Select