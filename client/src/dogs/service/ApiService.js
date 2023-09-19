import axios from 'axios'
const apiUrl = process.env.REACT_APP_DOMAIN

export const getReviews = async (profile_id) => {
    try {
        const { data } = await axios.get(`${apiUrl}/review/profile/${profile_id}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const getProfilesNameAndImages = async (profile_id) => {
    try {
        const { data } = await axios.get(`${apiUrl}/profile/data_for_review/${profile_id}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const createDog = async (review) => {
    try {
        const { data } = await axios.post(`${apiUrl}/dogs`, review)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}