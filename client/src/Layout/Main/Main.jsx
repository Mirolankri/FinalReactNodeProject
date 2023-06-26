import React from 'react'
import Container from 'react-bootstrap/esm/Container'

const Main = ({children}) => {
  return (
    <>
    <Container fluid className='p-0' style={{minHeight: '90vh'}}>{children}</Container>
    </>
  )
}

export default Main