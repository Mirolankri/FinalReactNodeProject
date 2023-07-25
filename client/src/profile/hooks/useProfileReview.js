import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { getProfilesNameAndImages, getReviews } from '../service/profileApiService'
import normalizeReview from '../helpers/normalization/normalizeReview'
import { createReview } from '../service/reviewApiService'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const useProfileReview = () => {
    const [ reviews, setReviews ] = useState([])
    const [ error, setError ] = useState(null)

    const navigate = useNavigate()

    const requestStatus = (errorMessage, reviews) => {
        setError(errorMessage)
        setReviews(reviews)
    }

    const handleCreateReview = useCallback( async (reviewFromClient, user_id, profile_id, type, to_profile) => {
        try {
            reviewFromClient.user_id = user_id
            reviewFromClient.profile_id = profile_id

            let review = normalizeReview(reviewFromClient)
            review = await createReview(review)
            
            requestStatus(null, setReviews(prev => ({...prev, review})))
            navigate(`${ROUTES.PROFILE}/${type}/${to_profile}`)

        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const handleGetWalkerReviews = useCallback( async (profile_id) => {
        try {
            const profileReviews = await getReviews(profile_id)
            return profileReviews
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const handleGetDataForReviews = useCallback( async (profile_id) => {
        try {
            const profileData = await getProfilesNameAndImages(profile_id)
            return profileData
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const value = useMemo( () => {
        return { reviews, error }
    }, [reviews, error])
    
    return {
        value,
        handleGetWalkerReviews,
        handleGetDataForReviews,
        handleCreateReview
    }
}

useProfileReview.propTypes = {}

export default useProfileReview