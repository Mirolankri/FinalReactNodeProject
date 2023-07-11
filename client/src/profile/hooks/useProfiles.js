import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../users/providers/UserProvider'
import { getProfile } from '../service/profileApiService'

const useProfiles = () => {
    const { userData } = useUser()
    const [ profile, setProfile ] = useState(null)

    const handleGetProfile = useCallback( async (user_id) => {
        try {
            const profile = await getProfile(user_id)
            setProfile(profile)
            return profile
        } catch (error) {
            return console.log('handleGetProfile Error');
        }
    }, [])

    const value = useMemo( () => {
        return { profile }
    }, [profile])

    return {
        value,
        handleGetProfile
    }
}

useProfiles.propTypes = {}

export default useProfiles