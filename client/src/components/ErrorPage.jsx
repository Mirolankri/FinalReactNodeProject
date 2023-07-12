import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PageHeader from './PageHeader'

const ErrorPage = () => {
  return (
<Container fluid>
<PageHeader _title={"שגיאה העמוד לא נמצא"}/>
<Row>
            <Col></Col>
                <Col as={"h3"} className="text-center m-2 p-2">
                <img src="/assets/images/dog/error.png" alt="Dog Logo" style={{width:"100%",maxWidth:"400px",minWidth:"300px"}}></img>

                  </Col>
            <Col></Col>
      </Row>
    </Container>
  )
}

export default ErrorPage