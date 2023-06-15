import React from 'react'
import Container from 'react-bootstrap/esm/Container'

const Main = ({children}) => {
  return (
    <>
    <Container fluid className='' style={{minHeight: '90vh'}}>{children}</Container>
    </>
  )
}

export default Main