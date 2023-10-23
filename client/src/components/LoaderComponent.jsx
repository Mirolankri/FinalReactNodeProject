import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const LoaderComponent = () => {
    return (
        <div style={{minHeight: '100%', minWidth: '100%'}} className='d-flex justify-content-center align-items-center '>
            <p>טוען נתונים...</p>
            <img src="/assets/images/dog/dog-h.png" alt="Dog Logo" style={{maxHeight:"300px",minHeight:"200px"}}></img>
            <Spinner animation="grow" />
        </div>
    )
}


export default LoaderComponent