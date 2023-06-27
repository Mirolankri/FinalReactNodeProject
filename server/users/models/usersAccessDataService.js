const config = require('config')
const DB = config.get("DB") || 'mongoDB'
const ProfileSchema = require('./mongoDB/Profile')

const createUpdateProfile = async (normalizedProfile) => {
    if (DB === 'mongoDB'){
        try {
            const { _id } = normalizedProfile
            let profile = await ProfileSchema.findOne({_id})

            if (profile){
                profile = await ProfileSchema.findByIdAndUpdate(_id, normalizedProfile, {new: true}).select(['-__v'])
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

module.exports = { createUpdateProfile }