import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ROUTES from '../routes/routesModel'

const HomePageOwner = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          {/* First row content */}
          <div style={{ height: '50vh', background: 'lightblue' }}>
            <h1>פגישות פעילות</h1>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        <Col className="text-center">
          {/* Button */}
          {/* <Nav.Link as={NavLink} to={`${ROUTES.CREATE_DOGWALKER}/${userData._id}`} style={{color:"#ffffff"}}>יצירת פרופיל דוגווקר</Nav.Link> */}
          <Button variant="orange" path="/contacts" className="btn-block w-50 rounded-bottom">תאם פגישה</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Second row content */}
          <div style={{ height: '50vh', background: 'lightgreen' }}>
            <h1>זמינים היום</h1>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePageOwner