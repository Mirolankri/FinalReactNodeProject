import axios from 'axios'
const apiUrl = "http://localhost:5005"

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

export const createReview = async (review) => {
    try {
        console.log(review)
        const { data } = await axios.post(`${apiUrl}/review`, review)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}