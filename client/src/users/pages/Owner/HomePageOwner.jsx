import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ROUTES from '../../../routes/routesModel'
import  Users  from '../../service/usersApiService'
import AvailableTody from './Components/AvailableTody'
import LoaderComponent from '../../../components/LoaderComponent'
import { dayNumber } from '../../../Helpers/DateTime'

const HomePageOwner = () => {
  const UsersInstanse = new Users({type:"isDogWalker"})

  const [DogWalker, setDogWalker] = useState([])
	const [isLoading, setLoading] = useState(false);
	const [getdaynumber, setdaynumber] = useState(dayNumber);
  // setdaynumber((prev)=>prev+1)
  useEffect(() => {
    
    setLoading(true)
    // UsersInstanse.GetUsersByType(`isDogWalker`)
    UsersInstanse.GetAvailableUsersForAppointments(getdaynumber)
    .then(res=>{
      
      setLoading(false)
      setDogWalker(res)
    })
    .catch(err=>console.error(err))
    
    
  }, [getdaynumber])  
  // 
  if(isLoading) return <LoaderComponent/>
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
          {/* <Button variant="orange" path="/contacts" className="btn-block w-50 rounded-bottom">תאם פגישה</Button> */}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Second row content */}
          <div style={{ height: '50vh', background: 'white' }}>
          <Button disabled hidden onClick={()=>setdaynumber((prev)=>prev+1)}>מחר</Button>
            <AvailableTody data={DogWalker}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePageOwner