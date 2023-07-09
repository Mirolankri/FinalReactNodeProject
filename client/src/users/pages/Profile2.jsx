import React from 'react'
import { Container } from 'react-bootstrap'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../providers/UserProvider'


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