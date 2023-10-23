import { useEffect } from 'react'
import { useToast } from '../providers/ToastProvider'
import { useUser } from '../users/providers/UserProvider'
import axios from 'axios'

const useAxios = () => {
    const toast = useToast()
    const { Token } = useUser()

    useEffect( () => {
        axios.defaults.headers.common["x-auth-token"] = Token
        axios.defaults.withCredentials = true;

        if (toast) {
            axios.interceptors.request.use( (data) => {
                return Promise.resolve(data)
            }, null );

            axios.interceptors.response.use( null, (error) => {
                const expectedError = error.response && error.response.status >= 400
                if (expectedError) toast('', error.response.data)
                return Promise.reject(error)
            } );
        }
    } , [toast, Token] )
}

export default useAxios