import React from 'react'
import {string} from 'prop-types'
import Form from 'react-bootstrap/Form'
import Text from './Text'
import Select from './Select'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Col from 'react-bootstrap/esm/Col'

const Input = ({ varient, type, name, data, label, error, errMsg, style, placeholder, options, onChange, formText, ...rest }) => {
    
    if( (varient === 'text') ) return (
        <>
            <FloatingLabel controlId={name} label={label} className="mb-3 col-12">
                <Form.Control isInvalid={error} type={varient} name={name} onChange={onChange} placeholder={placeholder} value={data[name] ? data[name] : ''} aria-describedby={name} required />
                <Form.Text id={name} muted>{formText ? formText : ''}</Form.Text>
                <div className="err-msg-container">
                    <Form.Control.Feedback className='msg' type="invalid">
                        {error ? errMsg : ''}
                    </Form.Control.Feedback>
                </div>
            </FloatingLabel>
        </>
    )

    if( (varient === 'date') ) return (
        <>
            <FloatingLabel controlId={name} label={label} className="mb-3 col-12">
                <Form.Control isInvalid={error} type={varient} name={name} onChange={onChange} placeholder={placeholder} defaultValue={data[name] ? data[name] : ''} aria-describedby={name} required />
                <Form.Text id={name} muted>{formText ? formText : ''}</Form.Text>
                <div className="err-msg-container">
                    <Form.Control.Feedback className='msg' type="invalid">
                        {error ? errMsg : ''}
                    </Form.Control.Feedback>
                </div>
            </FloatingLabel>
        </>
    )

    if( (varient === 'file') ) return (
        <>
            <FloatingLabel controlId={name} label={label} className="mb-3 col-12">
                <Form.Control isInvalid={error} type={varient} name={name} onChange={onChange} placeholder={placeholder} defaultValue={data[name] ? data[name] : ''} aria-describedby={name} required />
                <Form.Text id={name} muted>{formText ? formText : ''}</Form.Text>
                <div className="err-msg-container">
                    <Form.Control.Feedback className='msg' type="invalid">
                        {error ? errMsg : ''}
                    </Form.Control.Feedback>
                </div>
            </FloatingLabel>
        </>
    )

    if( varient === 'select' ) return (
        <>
            <FloatingLabel controlId={name} label={label} className="mb-3 col-12">
                <Form.Select isInvalid={error} name={name} onChange={onChange} value={data[name] ? data[name] : ''} aria-label={name} required>
                    <option value=''>יש לבחור אחת מהאפשרויות</option>
                    {options.map( (option, i) => (
                        <option key={i} value={option.val}>{ option.text }</option>
                    ) )}
                </Form.Select>
                <Form.Text id={name} muted>{formText ? formText : ''}</Form.Text>
                <div className="err-msg-container">
                    <Form.Control.Feedback className='msg' type="invalid">
                        {error ? errMsg : ''}
                    </Form.Control.Feedback>
                </div>
            </FloatingLabel>
        </>
    )
}

Input.propTypes = {
    varient: string.isRequired,
}

export default Input