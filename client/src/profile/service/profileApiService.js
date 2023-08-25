import axios from 'axios'
// const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5005"
const apiUrl = "http://localhost:5005"

export const getProfile = async (user) => {
    try {
        const { data } = await axios.get(`${apiUrl}/profile/by_user_id/${user}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const updateProfile = async (profile) => {
    try {
        const { data } = await axios.post(`${apiUrl}/profile/`, profile)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

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