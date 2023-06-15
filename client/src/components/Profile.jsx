import React from 'react'
import { useUser } from "../providers/UserProvider";
import { Container } from 'react-bootstrap';
import PageHeader from './PageHeader';


const Profile = () => {
    const {userData} = useUser()

  return (
    <Container fluid>
      <PageHeader _title={"פרופיל"}/>
    
    <div>{JSON.stringify(userData)}</div>
    </Container>
  )
}

export default Profile