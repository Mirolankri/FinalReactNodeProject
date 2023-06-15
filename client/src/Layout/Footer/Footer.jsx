import React from 'react'
// import Container from 'react-bootstrap/esm/Container'
import {Col,Row,Container} from 'react-bootstrap'
import ScrenSize from '../../Helpers/ScrenSize'

const Footer = () => {
  return (
    <Container fluid className='' style={{}}>
        <Row>
        <Col><ScrenSize/></Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>

  )
}

export default Footer