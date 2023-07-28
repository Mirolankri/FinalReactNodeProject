import React, { useCallback, useMemo, useState } from 'react'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { getProfile, getProfilesNameAndImages, getReviews, updateProfile } from '../service/profileApiService'
import normalizeProfile from '../helpers/normalization/normalizeProfileOwner'
import ROUTES from '../../routes/routesModel'

const useOwnerProfile = () => {
    const { userData } = useUser()
    const [ profile, setProfile ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ reviews, setReviews ] = useState([])

    const navigate = useNavigate()

    useAxios()

    const requestStatus = (errorMessage, profile) => {
        setError(errorMessage)
        setProfile(profile)
    }

    const handleGetProfile = useCallback( async (user_id) => {
        try {
            const profile = await getProfile(user_id)
            setProfile(profile)
            requestStatus(null, profile)
            return profile
        } catch (error) {
            requestStatus(error, null)
            return null
        }
    }, [])

    const handleUpdateProfile = useCallback( async (profileFromClient, user_id, type) => {
        try {
            profileFromClient.user_id = user_id
            let normalizedProfile = normalizeProfile(profileFromClient)
            const profile = await updateProfile(normalizedProfile)
            requestStatus(null, profile)
            navigate(`${ROUTES.PROFILE}/owner/${user_id}`)
        } catch (error) {
            requestStatus(error, null)
        }
    } , [])

    const handleGetOwnerReviews = useCallback( async (profile_id) => {
        try {
            const profileReviews = await getReviews(profile_id)
            return profileReviews
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const handleGetDataForReview = useCallback( async (profile_id) => {
        try {
            const profileData = await getProfilesNameAndImages(profile_id)
            return profileData
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const value = useMemo( () => {
        return { profile, reviews }
    }, [profile, reviews])

    return {
        value,
        handleGetProfile,
        handleUpdateProfile,
        handleGetOwnerReviews,
        handleGetDataForReview,
        setReviews
    }
}

export default useOwnerProfile