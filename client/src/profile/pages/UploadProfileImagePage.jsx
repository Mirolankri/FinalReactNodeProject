import React, { useState } from 'react'
import UpdateProfileImageForm from '../components/UpdateProfileImageForm'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm'
import initialProfileImage from '../helpers/initialForms/initialProfileImage'
import updateProfileImageSchema from '../models/joi-schema/updateProfileImageSchema'
import useProfileImage from '../hooks/useProfileImage'

const UploadProfileImagePage = () => {
    const { user_id } = useParams()
    const navigate = useNavigate()
    const [ profileImage, setProfileImage ] = useState(null)
    const { handleUpload } = useProfileImage()

    const handleFileChange = (event) => {
        rest.handleChange()
        setProfileImage(event.target.files[0]);
    }

    const { value, ...rest } = useForm(initialProfileImage, updateProfileImageSchema, () => {
        console.log(value.data.profileImage);
        handleUpload(value.data.profileImage, user_id)
    })

    return (
        <UpdateProfileImageForm title='עדכון תמונת פרופיל' subTitle='' onSubmit={rest.onSubmit} errors={value.errors} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={handleFileChange} data={value.data} />
    )
}

export default UploadProfileImagePage