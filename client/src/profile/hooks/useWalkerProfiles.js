import React, { useCallback, useMemo, useState } from 'react'
import { useUser } from '../../users/providers/UserProvider'
import { getProfile, getProfilesNameAndImages, getReviews, updateProfile } from '../service/profileApiService'
import normalizeProfile from '../helpers/normalization/normalizeProfile'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import useAxios from '../../hooks/useAxios'

const useWalkerProfiles = () => {
    const { userData } = useUser()
    const [ profile, setProfile ] = useState(null)
    const [ isLoading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ reviews, setReviews ] = useState([])

    const navigate = useNavigate()

    useAxios()

    const requestStatus = (errorMessage, profile, loading) => {
        setError(errorMessage)
        setProfile(profile)
        setLoading(loading)
    }

    const handleGetProfile = useCallback( async (user_id) => {
        try {
            setLoading(true)
            const profile = await getProfile(user_id)
            setProfile(profile)
            requestStatus(null, profile, false)
            return profile
        } catch (error) {
            requestStatus(error, null)
            return null
        }
    }, [])

    const handleUpdateProfile = useCallback( async (profileFromClient, user_id, type) => {
        try {
            setLoading(true)
            profileFromClient.user_id = user_id
            let normalizedProfile = normalizeProfile(profileFromClient)
            const profile = await updateProfile(normalizedProfile)
            requestStatus(null, profile)
            navigate(`${ROUTES.PROFILE}/${type}/${user_id}`)
        } catch (error) {
            requestStatus(error, null)
        }
    } , [])

    const handleGetWalkerReviews = useCallback( async (profile_id) => {
        try {
            setLoading(true)
            const profileReviews = await getReviews(profile_id)
            return profileReviews
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const handleGetDataForReviewa = useCallback( async (profile_id) => {
        try {
            setLoading(true)
            const profileData = await getProfilesNameAndImages(profile_id)
            return profileData
        } catch (error) {
            requestStatus(error, null)
        }
    }, [] )

    const value = useMemo( () => {
        return { profile, reviews, isLoading }
    }, [profile, reviews, isLoading])

    return {
        value,
        handleGetProfile,
        handleUpdateProfile,
        handleGetWalkerReviews,
        handleGetDataForReviewa,
        setReviews
    }
}

export default useWalkerProfiles