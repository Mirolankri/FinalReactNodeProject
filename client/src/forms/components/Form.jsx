import React from 'react'
import { node, string, func } from 'prop-types'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactForm from 'react-bootstrap/Form'

const Form = ({ title, subTitle, onSubmit, onReset, onChange, to, children }) => {
    const navigate = useNavigate()

    return (
        <div className="Auth-form-container">
            <div className="Auth-form-title">
                <img src="/assets/images/logo/logo-orange.png" alt="Main Logo" width='100%'></img>
            </div>
            <ReactForm className="Auth-form" style={{backgroundColor:'#FFF8F880'}}>
                <div className="Auth-form-content">
                    <Container dir='rtl'>
                        <h1 className='mt-5 text-center' style={{fontSize:'2.2rem'}}>{ title }</h1>
                        <p className='mb-4 text-center font-weight-normal'>{ subTitle }</p>
                        <div className='d-flex justify-content-between flex-wrap' style={{rowGap: '15px'}}>
                            { children }
                        </div>
                        <Row className='pl-2 pt-4'>
                            <Col className='p-2 py-1'>
                                <Button variant="outline" style={{width: '100%' }} onClick={onReset}>איפוס</Button>
                            </Col>
                            <Col className='p-2 py-1'>
                                <Button style={{width: '100%', backgroundColor: '#ff4c00', borderColor: '#ff4c00'}} onClick={()=>navigate(to)}>ביטול</Button>
                            </Col>
                        </Row>
                        <Row className='pl-2'>
                            <Col className='p-2'>
                                <Button variant="orange" style={{width: '100%' }} disabled={!!onChange()} onClick={onSubmit}>שליחה</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ReactForm>

            <div className="Auth-form-footer">
                <img src="/assets/images/dog/dog-reg.png" alt="Dog Logo" width='100%'></img>
            </div>
        </div>
    )
}

Form.propTypes = {
    children: node.isRequired,
    title: string.isRequired,
    subTitle: string.isRequired,
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onChange: func.isRequired,
    to: string.isRequired
}

export default React.memo(Form)
