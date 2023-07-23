import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

const HomePageOwner = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          {/* First row content */}
          <div style={{ height: '50vh', background: 'lightblue' }}>
            <h1>First Row2</h1>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        <Col className="text-center">
          {/* Button */}
          <Button variant="orange" className="btn-block w-50 rounded-bottom">תאם פגישה</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Second row content */}
          <div style={{ height: '50vh', background: 'lightgreen' }}>
            <h1>Second Row</h1>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePageOwner