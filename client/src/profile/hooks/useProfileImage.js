import { useCallback, useMemo, useState } from 'react'
import { useToast } from '../../providers/ToastProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useForm from '../../forms/hooks/useForm'

const useProfileImage = () => {
    const [ profileImage, setProfileImage ] = useState(null)
    const [ error, setError ] = useState(null)
    const toast = useToast()
    const { setErrors } = useForm()

    const navigate = useNavigate()

    const requestStatus = (errorMessage, image) => {
        setError(errorMessage)
        setProfileImage(image)
    }

    const handleFileChange = useCallback( (event) => {
        console.log(event.target.files[0]);
        setErrors([])
        setProfileImage(event.target.files[0])
    }, [] )

    const handleUpload = useCallback( async (profile_id) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(profileImage)
            console.log(1);
            reader.onloadend = async () => {
                const profile_image = reader.result
                const response = await axios.post('http://localhost:8000/profile/update_profile_image', { profile_image, profile_id })
                toast('', response.data)
            }
        } catch (error) {
            console.log(error);
            requestStatus(error, null)
        }
    }, [] )

    const value = useMemo( () => {
        return { profileImage, error }
    }, [profileImage, error])

    return {
        value,
        handleUpload,
        handleFileChange
    }
}

export default useProfileImage