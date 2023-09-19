import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const LoaderComponent = () => {
    return (
        <div style={{minHeight: '100%', minWidth: '100%'}} className='d-flex justify-content-center align-items-center '>
            <Spinner animation="grow" />
        </div>
    )
}


export default LoaderComponent