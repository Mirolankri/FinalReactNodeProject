import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../users/providers/UserProvider'
import { getProfile, updateProfile } from '../service/profileApiService'
import normalizeProfile from '../helpers/normalization/normalizeProfile'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const useProfiles = () => {
    const { userData } = useUser()
    const [ profile, setProfile ] = useState(null)
    const [ error, setError ] = useState(null)

    const navigate = useNavigate()

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

    const handleUpdateProfile = useCallback( async (profileFromClient, user_id) => {
        try {
            profileFromClient.user_id = user_id
            const normalizedProfile = normalizeProfile(profileFromClient)
            const profile = await updateProfile(normalizedProfile)
            requestStatus(null, profile)
            navigate(`${ROUTES.PROFILE}/${user_id}`)
        } catch (error) {
            requestStatus(error, null)
        }
    } , [])

    const value = useMemo( () => {
        return { profile }
    }, [profile])

    return {
        value,
        handleGetProfile,
        handleUpdateProfile
    }
}

useProfiles.propTypes = {}

export default useProfiles