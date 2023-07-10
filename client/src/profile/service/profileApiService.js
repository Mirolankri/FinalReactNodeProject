import axios from 'axios'
// const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5005"
const apiUrl = "http://localhost:5005"

export const getProfile = async (user) => {
    try {
        const { data } = await axios.get(`${apiUrl}/profile/by_user_id/${user._id}`);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
  }