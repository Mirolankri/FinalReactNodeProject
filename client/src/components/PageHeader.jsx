import React from 'react'
import {Col,Row,Container} from 'react-bootstrap'

const PageHeader = ({_title,_subtitle,RightComponentFill = null,LeftComponentFill=null}) => {
  return (
    <Container fluid >
        <Row>
            <Col className=" m-2 p-2" >{RightComponentFill ? (RightComponentFill):(<RightComponent/>)}</Col>
                <Col as={"h3"} className="text-center m-2 p-2">{_title}</Col>
            <Col className=" m-2 p-2">{LeftComponentFill ? (LeftComponentFill):(<LeftComponent/>)}</Col>
      </Row>
     </Container>
  )
}
const RightComponent = ()=> {
  return (<></>)
}
const LeftComponent = ()=> {
  return (<></>)
}
export default PageHeader