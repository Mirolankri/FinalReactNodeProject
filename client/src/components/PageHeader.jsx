import React from 'react'
import {Col,Row,Container} from 'react-bootstrap'

const PageHeader = ({_title,_subtitle}) => {
  return (
    <Container fluid >
        <Row>
            <Col></Col>
                <Col as={"h3"} className="text-center m-2 p-2">{_title}</Col>
            <Col></Col>
      </Row>
     </Container>
  )
}

export default PageHeader