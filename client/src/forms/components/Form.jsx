import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactForm from 'react-bootstrap/Form'

const Form = ({ title, onSubmit, onReset, onChange, to, children }) => {
    const navigate = useNavigate()

    return (
        <ReactForm>
            <Container>
                <h1 style={{textAlign: 'center'}} className='mt-5'>{ title }</h1>
                <div className='d-flex justify-content-between flex-wrap' style={{gap: '15px'}}>
                    { children }
                </div>
                <Row>
                    <Col>
                        <Button onClick={onReset}>Reset</Button>
                    </Col>
                    <Col>
                        <Button onClick={()=>navigate(to)}>Cancel</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={onSubmit}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        </ReactForm>
    )
}

Form.propTypes = {}

export default React.memo(Form)
