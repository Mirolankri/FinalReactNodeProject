import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Text from './Text'
import Select from './Select'

const Input = ({ type, name, data, label, required, style, isSelect = false, value, placeholder, options, onChange, formText, ...rest }) => {
    return (
        <>
        <div className='col-12 col-md-6 p-2' >
            <Form.Label htmlFor={name}>{label}</Form.Label>
            { isSelect ? <Select name={name} onChange={onChange} required={required} options={options} placeholder={placeholder}/> : <Text value={value} type={type} name={name} onChange={onChange} required={required} placeholder={placeholder}/> }
            <Form.Text id={name} muted>{formText}</Form.Text>
        </div>
        </>
    )
}

Input.propTypes = {}

export default Input