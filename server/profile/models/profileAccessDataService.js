require('dotenv').config()
const DB = process.env.DB || 'mongoDB'
const ProfileSchema = require('./mongoDB/Profile')
const { pick } = require('lodash')

const createUpdateProfile = async (normalizedProfile) => {
    if (DB === 'mongoDB'){
        try {
            const { user_id } = normalizedProfile
            let profile = await ProfileSchema.findOne({user_id})

            if (profile){
                console.log(user_id);
                profile = await ProfileSchema.findByIdAndUpdate(profile._id, normalizedProfile, {new: true}).select(['name.first','name.last'])
                return Promise.resolve(profile)
            }

            profile = new ProfileSchema(normalizedProfile)
            profile = await profile.save()
            return Promise.resolve(profile)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }
}

const getProfile = async (user_id) => {
    if (DB === 'mongoDB'){
        try {
            let profile = await ProfileSchema.findOne({user_id})
            if (!profile) throw new Error ('Profile not found')

            // profile = pick(profile, [''])
            console.log(profile)

            return Promise.resolve(profile)
        } catch (error) {
            error.status = 205
            return Promise.reject(error)
        }
    }
}

module.exports = { createUpdateProfile, getProfile }