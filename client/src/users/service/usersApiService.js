import axios from 'axios'
axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_DOMAIN

class Users {
    constructor(_Params={})
    {
        for (const [key, value] of Object.entries(_Params)) {
            this[key] = value;
        }
    }
    SignUp = async(_Body)=>{
        try {
            if(!_Body.email && !_Body.username) throw Error('שם משתמש או סיסמא חובה')
            // const instance = axios.create({
            //     withCredentials: true
            //   })
              const headers = { 
                // 'Authorization': 'Bearer my-token',
                "Content-Type": "application/json",
                };
            const { data } = await axios.post(`${apiUrl}/user/register`, _Body, { headers:headers })

            // const { data } = await axios.get(`${apiUrl}/user/get-user-by-type/${this.type}`)
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    }
    Login = async (_Body)=>{
        try {
            if((!_Body.email && !_Body.password) && (!_Body.clientId && !_Body.credential)) throw Error('שם משתמש או סיסמא חובה')
            // const instance = axios.create({
            //     withCredentials: true
            //   })
              const headers = { 
                // 'Authorization': 'Bearer my-token',
                "Content-Type": "application/json",
                };
            const { data } = await axios.post(`${apiUrl}/user/login`, _Body, { headers:headers })

            // const { data } = await axios.get(`${apiUrl}/user/get-user-by-type/${this.type}`)
            return data
        } catch (error) {
            return Promise.reject(error)
        }

    }
    OTPVerification = async (_Body)=>{
        try {
            if(!_Body.code || _Body.code.length < 6) throw Error('חובה לשלוח קוד אימות')
            // const instance = axios.create({
            //     withCredentials: true
            //   })
              const headers = { 
                // 'Authorization': 'Bearer my-token',
                "Content-Type": "application/json",
                };
            const { data } = await axios.post(`${apiUrl}/user/verification`, _Body, { headers:headers })

            // const { data } = await axios.get(`${apiUrl}/user/get-user-by-type/${this.type}`)
            return data
        } catch (error) {
            return Promise.reject(error)
        }


    }
    GetUsersByType = async () => {
            try {
                if(!this.type) throw Error('חובה לשלוח סוג משתמש')
                const { data } = await axios.get(`${apiUrl}/user/get-user-by-type/${this.type}`)
                return data
            } catch (error) {
                return Promise.reject(error)
            }
    }
    GetAvailableUsersForAppointments = async (_DayNumber) => {
            try {
                if (_DayNumber < 0 || _DayNumber > 7) throw Error('חובה לשלוח את אחד מימות השבוע מ 0 עד 7')
                const { data } = await axios.get(`${apiUrl}/user/available-for-appointments/${_DayNumber}`)
                return data
            } catch (error) {
                return Promise.reject(error)
            }
    }
}
export default Users


// export const GetUsersByType = async (_Type) => {
//     try {
//         const { data } = await axios.get(`${apiUrl}/user/get-user-by-type/${_Type}`)
//         return data
//     } catch (error) {
//         return Promise.reject(error)
//     }
// }
