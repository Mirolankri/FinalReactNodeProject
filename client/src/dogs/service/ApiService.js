import axios from 'axios'
axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_DOMAIN


export const GetMyDogs = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/dogs`)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}
export const createDog = async (_DogData) => {
    try {
        const { data } = await axios.post(`${apiUrl}/dogs`, _DogData)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}
export const UpdateDog = async (_DogData,_DogID) => {
    try {
        const { data } = await axios.put(`${apiUrl}/dogs/${_DogID}`, _DogData)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}
export const DeleteDog = async (_DogID) => {
    try {
        const { data } = await axios.delete(`${apiUrl}/dogs/${_DogID}`)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}