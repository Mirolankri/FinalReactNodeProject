import React from 'react'
// import Container from 'react-bootstrap/esm/Container'
import {Col,Row,Container, Nav} from 'react-bootstrap'
import ScrenSize from '../../Helpers/ScrenSize'
import * as Icon from 'react-bootstrap-icons';
import { excludeNavbarPaths } from '../LayoutSettings';
import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const shouldExcludeNavbar = excludeNavbarPaths.includes(location.pathname);

  return (
    <>
    {!shouldExcludeNavbar && 
    (
      <Nav fill variant='underline' className="justify-content-center" activeKey={"/"} as="ul" style={{background: 'white',position: 'sticky', bottom: 0,left: 0, right: 0}}>
        <Nav.Item as="li">
          <Nav.Link as={NavLink} to={"/"} eventKey="/"><Icon.House color='' size={25}/></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={NavLink} to={"/Calendar4Week"} eventKey="Calendar4Week"><Icon.Calendar4Week color='' size={25}/></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={NavLink} to={"/Store"} eventKey="Store"><Icon.Cart2 color='' size={25}/></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={NavLink} to={"/profile"} eventKey="profile" ><Icon.PersonCircle color='' size={25}/></Nav.Link>
        </Nav.Item>
      </Nav>
    )
    }
    


    <Container fluid className="text-center d-none" style={{position: 'sticky', bottom: 0,left: 0, right: 0}}>
        <Row>
          <Col xs={3}><Icon.House color='' size={25}/></Col>
          <Col xs={3}><Icon.Calendar4Week color='' size={25}/></Col>
          <Col xs={3}><Icon.Cart2 color='' size={25}/></Col>
          <Col xs={3}><Icon.PersonCircle color='' size={25}/></Col>
      </Row>
    </Container>
    <Container fluid className='d-none' style={{}}>
        <Row>
        <Col><ScrenSize/></Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
    </>
    

  )
}

export default Footer