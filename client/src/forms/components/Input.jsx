import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Text from './Text'
import Select from './Select'

const Input = ({ type, name, data, label, error, style, isSelect = false, isTextArea= false, placeholder, options, onChange, formText, ...rest }) => {
    return (
        <div className='col-12 p-2 position-relative' >
            <Form.Label htmlFor={name}>{label}</Form.Label>
            { isSelect ? <Select data={data} name={name} id={name} onChange={onChange} options={options} placeholder={placeholder}/> : <Text isTextArea={isTextArea} data={data} type={type} name={name} id={name} onChange={onChange} placeholder={placeholder}/> }
            <Form.Text id={name} muted>{formText}</Form.Text>
            <div className="error">{}</div>
        </div>
    )
}

Input.propTypes = {}

export default Input