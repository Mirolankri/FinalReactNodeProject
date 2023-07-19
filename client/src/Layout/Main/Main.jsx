import React from 'react'
import Container from 'react-bootstrap/esm/Container'

const Main = ({children}) => {
  return (
    <>
    <Container fluid className='p-0' style={{minHeight: 'calc(100vh - 58px - 43px)'}}>{children}</Container>
    </>
  )
}

export default Main