import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import ProfileReviewForm from '../components/ProfileReviewForm'
import useForm from '../../forms/hooks/useForm'
import initialProfileReview from '../helpers/initialForms/initialProfileReview'
import updateProfileReviewSchema from '../models/joi-schema/updateProfileReviewSchema'
import useProfileReview from '../hooks/useProfileReview'
import { useUser } from '../../users/providers/UserProvider'

const CreateProfileReview = () => {
    const { userData } = useUser()
    const { profile_id } = useParams()
    const { handleCreateReview } = useProfileReview()

    const { value, ...rest } = useForm(initialProfileReview, updateProfileReviewSchema, () => {
        handleCreateReview(value.data, userData._id, profile_id, -1 )
    })

    return (
        <ProfileReviewForm title={'ביקורת'} onSubmit={rest.onSubmit} onReset={rest.handleReset} onFormChange={rest.validateForm} to={-1} errors={value.errors} onInputChange={rest.handleChange} data={value.data} />
    )
}

CreateProfileReview.propTypes = {}

export default CreateProfileReview