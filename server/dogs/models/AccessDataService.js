require('dotenv').config()
const DB = process.env.DB || 'mongoDB'
const mongoose = require('mongoose')
const DogsSchema = require('./mongoDB/Dog')

const getMyDogs = async (_UserID) =>{
    if(DB === "mongoDB")
    {
        try {
            const GetAllDogs = await DogsSchema.find({user_id: _UserID})
            if(!GetAllDogs) 
                throw new Error(`לא נמצאו נתונים במסד הנתונים`)

            return Promise.resolve(GetAllDogs)
        } catch (error) {
            // handleError()
            error.status = 404
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")
}
const getDogByID = async (_DogID) =>{
    if(DB === "mongoDB")
    {
        try {
            const FindDog = await DogsSchema.findById(_DogID)
            if(!FindDog) 
                throw new Error(`לא נמצאו נתונים במסד הנתונים`)

            return Promise.resolve(FindDog)
        } catch (error) {
            // handleError()
            error.status = 404
            return Promise.reject(error)
        }
    }
    return Promise.resolve("not in mongodb")
}
const CreateDog = async (_normalizeDog) => {
    if(DB === 'mongoDB'){
        try {
            const Dog = new DogsSchema(_normalizeDog)
            await Dog.save()
            return Promise.resolve(Dog)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}
const UpdateDog = async (_DogID,_UserID,_DogData) => {
    if(DB === 'mongoDB'){
        try {
            let FindDog = await DogsSchema.findById(_DogID,{user_id:1})
            if(!FindDog)
                throw new Error(`לא נמצאו נתונים במסד הנתונים`)
            
            if(FindDog.user_id != _UserID) throw new Error(`אתה לא מורשה לערוך כלב זה`)
    
            let Dog = await DogsSchema.findByIdAndUpdate(_DogID,_DogData,{new:true})
            if(!Dog) throw new Error(`לא נמצא כלב כזה ${_DogID}`)    
            return Promise.resolve(Dog)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}
const DeleteDog = async (_DogID,_UserID) => {
    if(DB === 'mongoDB'){
        try {
            const FindDog = await DogsSchema.findById(_DogID,{user_id:1})
            if(!FindDog)
                throw new Error(`לא נמצאו נתונים במסד הנתונים`)
            
            if(FindDog.user_id != _UserID)
                throw new Error(`אתה לא מורשה להסיר כלב זה`)
    
            let Dog = await DogsSchema.findByIdAndDelete(_DogID)
            if(!Dog) throw new Error(`לא נמצא כלב כזה ${_DogID}`)

            return Promise.resolve(Dog)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}


module.exports = { getMyDogs,getDogByID,CreateDog,UpdateDog,DeleteDog }