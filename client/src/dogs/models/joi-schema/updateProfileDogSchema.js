import Joi from 'joi'

const updateProfileDogSchema = {
    name: Joi.string().min(2).max(50).required(),
    gender: Joi.string().required(),
    allergy: Joi.string().min(2).max(3).required(),
    birth: Joi.date().required().less('now'),
    meetdogs: Joi.string().min(2).max(3).required(),
    meetpepole: Joi.string().min(2).max(3).required(),
    about: Joi.string().min(2).max(300),
    active:Joi.boolean(),
    user_id:Joi.string()
}

export default updateProfileDogSchema