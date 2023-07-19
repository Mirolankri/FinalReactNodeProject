import Joi from 'joi'

const updateProfileWalkerSchema = {
    first: Joi.string().min(2).max(256).required(),
    last: Joi.string().min(2).max(256).required(),
    birth: Joi.date().required().less('now'),
    gender: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().ruleset.regex(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/).rule({ message: 'יש להכניס מספר סלולארי ישראלי בעל 10 ספרות.' }).required(),
    dogCount: Joi.number().required(),
    payBy: Joi.string().required(),
    mobile: Joi.boolean().required(),
    experience: Joi.string().required(),
    bigDogs: Joi.boolean().required(),
    about: Joi.string().min(2).required()
}

export default updateProfileWalkerSchema