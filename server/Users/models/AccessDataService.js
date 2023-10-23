require('dotenv').config()
const DB = process.env.DB || 'mongoDB'
const mongoose = require('mongoose')
const UserSchema = require('../../db/schemas/User')
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
const ProfileSchema = require('../../profile/models/mongoDB/Profile');
const AppointmentsSchema = require('../../profile/models/mongoDB/Appointments/Appointments');
const { getMyDogs } = require('../../dogs/models/AccessDataService');
const { ComparePassWord, GeneratePassWord } = require('../../helpers/bcrypt');
const { response } = require('express');
const { verifyGoogleToken } = require('../../helpers/googleverify');
const { generateCode } = require('../../helpers/generateNumbers');

const Login = async (_BodyData)=>{
    if(DB === "mongoDB")
    {
        let response = {}
        try {
        const { email, password,credential,clientId } = _BodyData;
        const {payload,error} = await verifyGoogleToken(credential);

        let GetDogs = []
        let emailforsignin = email??payload.email
        console.log(emailforsignin);
        let CheckUserLogin = await UserSchema.findOne({
            $or: [{ tel: emailforsignin }, { email: emailforsignin }],
        })
        if(!CheckUserLogin && payload){
            CheckUserLogin = await register({email:payload.email,UserType:false,SignWith:true})

        }

        if(!CheckUserLogin) throw Error('שם משתמש או סיסמא שגויים')
        // if(!CheckUserLogin) return handleError(res,403,`שם משתמש או סיסמא שגויים`)

        if(!payload)
        {
            let CheckPassWord = ComparePassWord(password, CheckUserLogin.password);
    
            if (!CheckPassWord) throw Error('שם משתמש או סיסמא שגויים')
        }
        // {
        //     return handleError(res,403,`שם משתמש או סיסמא שגויים`)
        //     return res.json({
        //         error_message: "שם משתמש או סיסמא שגויים",
        //     });
        // }
        
        response = {...CheckUserLogin._doc}
        

        const MyDog = await getMyDogs(CheckUserLogin._id);
        if(MyDog) response.MyDogs = MyDog
        response.token = jwt.sign({ username: CheckUserLogin.username }, secretKey,{ expiresIn: "24h" });



        return Promise.resolve(response)

        } catch (error) {
            error.status = 403
            return Promise.reject(error)

        }
    }
    return Promise.resolve("not in mongodb")
}

const register = async (_BodyData) =>{
    if(DB === "mongoDB")
    {
        try {
            const { email, password, tel, username,UserType } = _BodyData;
            // let CheckUserRegister = await UserSchema.findOne({email})

            let ParamToSearch = {
                $or: [{ tel: tel??email }, { email: email }],
            }
            console.log("ParamToSearch",ParamToSearch);
            let CheckUser = await UserSchema.findOne(ParamToSearch)
    
            if(CheckUser) throw new Error('משתמש קיים במערכת')
            switch (UserType) {
                case '1':
                    _BodyData.isDogManager = true
                    break;
                case '2':
                    _BodyData.isDogWalker = true
                    break;
            }
            let RandomPassword = `F${generateCode(10000000,99999999)}!`
            _BodyData.password = GeneratePassWord(password??RandomPassword)
            const SplitEmailForUserName = email.split('@');
            const ASGUserName = SplitEmailForUserName[0]; // part before the '@' symbol
            const ASGDomainEmail = SplitEmailForUserName[1]; // part after the '@' symbol
            _BodyData.username = username??ASGUserName
            let User = await UserSchema(_BodyData).save()
            // Set the user ID in the session
            
            // const decoded = jwt.verify(_Token, secretKey);
            // let CheckUserLogin = await UserSchema.findOne({username:decoded.username})
            // if(!CheckUserLogin)
            //     throw Error('משתמש לא נמצא')
    
            return Promise.resolve(User)
        } catch (error) {
            error.status = 409
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")

}


const getMe = async (_UserID,_Token) =>{
    if(DB === "mongoDB")
    {
        try {
            if(!_UserID) throw Error('לא נמצא משתמש מחובר')
            if(!_Token) throw Error('חסר טוקן')

            const decoded = jwt.verify(_Token, secretKey);
            let CheckUserLogin = await UserSchema.findOne({username:decoded.username})
            if(!CheckUserLogin)
                throw Error('משתמש לא נמצא')
    
            return Promise.resolve(CheckUserLogin)
        } catch (error) {
            error.status = 403
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")
}


const GetUsers = async (_Filter = null,_Option = {})=>{

    if(DB === "mongoDB")
    {
        let FindBy = {}
        try {
            if(_Filter) FindBy = _Filter

            let GetUsersByFilter = await UserSchema.find(FindBy)
            if(!GetUsersByFilter)
                throw Error('לא נמצאו משתמשים')
    
                let gg = await GetUserAvailableForAppointment({
                    'Days.DayNumber': 1,
                    'Days.active': true,
                  })
                  const activeAppointments = gg.all.filter(appointment => {
                    return appointment.Days.some(day => day.DayNumber == 1 && day.active === true);
                  });
    
            if(Object.values(_Option).length && _Option.GetProfile === true)
            {
                GetUsersByFilter = JSON.stringify(GetUsersByFilter)
                GetUsersByFilter = JSON.parse(GetUsersByFilter)
                const arrayOfIdsToGetProfiles = GetUsersByFilter.map(user => new mongoose.Types.ObjectId(user._id));
                let GetProfiles = await ProfileSchema.find({ user_id: { $in: arrayOfIdsToGetProfiles } })
                GetUsersByFilter.map((user,index) => {
                    const userProfile = GetProfiles.find(profile => profile.user_id.equals(user._id));
                    const GetAllUsersAvailableForAppointment1 = activeAppointments.find(profile => {
                        return profile.user_id === user._id
                        // console.log(profile.user_id.equals(user._id));
                        console.log(profile.user_id);
                        console.log(user._id);
                    });

                    if (userProfile) user.profile = userProfile;
                    if (GetAllUsersAvailableForAppointment1) user.Appointment = GetAllUsersAvailableForAppointment1;

                    return user
                  });    

                  
            }
            

            
            
            return Promise.resolve(GetUsersByFilter)
        } catch (error) {
            // handleError()
            error.status = 403
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")

}


const GetUserAvailableForAppointment = async (_Filter = null,_Option = {})=>{
    if(DB === "mongoDB")
    {
        let FindBy = {'Days.active':true}
        try {
            if(_Filter.DayNumber) FindBy['Days.DayNumber'] = _Filter.DayNumber;


            let AvailableForAppointment = await AppointmentsSchema.find(FindBy)
            // console.log(AvailableForAppointment);
            let GetAllUsersAvailableForAppointment = JSON.parse(JSON.stringify(AvailableForAppointment))
            if(_Filter.DayNumber){
                GetAllUsersAvailableForAppointment = GetAllUsersAvailableForAppointment.filter(appointment => {
                    return appointment.Days.some(day => day.DayNumber == _Filter.DayNumber && day.active === true);
                  });
            }
            
            if(GetAllUsersAvailableForAppointment.length){

                const arrayOfIdsToGetProfiles1 = GetAllUsersAvailableForAppointment.map(user => new mongoose.Types.ObjectId(user.user_id));
            
                let GetUsersByFilter = await UserSchema.find({ _id: { $in: arrayOfIdsToGetProfiles1 } })
    
                  
                GetUsersByFilter = JSON.parse(JSON.stringify(GetUsersByFilter))
                const arrayOfIdsToGetProfiles = GetUsersByFilter.map(user => new mongoose.Types.ObjectId(user._id));
                let GetProfiles = await ProfileSchema.find({ user_id: { $in: arrayOfIdsToGetProfiles } })
                GetAllUsersAvailableForAppointment = GetUsersByFilter.map((user,index) => {
                    const userProfile = GetProfiles.find(profile => profile.user_id.equals(user._id));
                    const GetAllUsersAvailableForAppointment1 = GetAllUsersAvailableForAppointment.find(profile => {
                        return profile.user_id === user._id
                        // console.log(profile.user_id.equals(user._id));
                        console.log(profile.user_id);
                        console.log(user._id);
                    });
                    if (userProfile) user.profile = userProfile;
                    if (GetAllUsersAvailableForAppointment1) user.Appointment = GetAllUsersAvailableForAppointment1;
                    return user
                  });    
            }  
            
            return Promise.resolve(GetAllUsersAvailableForAppointment)
        } catch (error) {
            // handleError()
            error.status = 403
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")
}
module.exports = { Login,register,getMe,GetUsers,GetUserAvailableForAppointment }