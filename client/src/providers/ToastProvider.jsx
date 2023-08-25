import React, { useCallback, useContext, useState } from 'react'
import { node } from 'prop-types'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastContext = React.createContext(null)

export const ToastProvider = ({ children }) => {
    const [isToastShow, setToastShow] = useState(false)
    const [toastMessage, setToastMessage] = useState('Toast Message')

    const setToast = useCallback( (color, message) => {
        setToastShow(true)
        setToastMessage(message)
    }, [] )

    return (
        <>
        <ToastContainer position='bottom-center' className='p-2'>
            <Toast onClose={() => setToastShow(false)} show={isToastShow} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Pawllo</strong>
                    <small>נובחים על בלתמים</small>
                </Toast.Header>
                <Toast.Body>{ toastMessage }</Toast.Body>
            </Toast>
        </ToastContainer>

        <ToastContext.Provider value={setToast}>
            {children}
        </ToastContext.Provider>
        </>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context)
        throw new Error("useToast must be used within a ToastProvider");
    return context
}

ToastProvider.propTypes = {
    children: node.isRequired
}