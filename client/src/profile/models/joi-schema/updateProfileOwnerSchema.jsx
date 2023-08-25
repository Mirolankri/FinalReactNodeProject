import Joi from 'joi'

const updateProfileOwnerSchema = {
    first: Joi.string().min(2).max(256).required(),
    last: Joi.string().min(2).max(256).required(),
    birth: Joi.date().required().less('now'),
    gender: Joi.string().required(),
    city: Joi.string().min(2).required(),
    street: Joi.string().min(2).required(),
    phone: Joi.string().ruleset.regex(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/).rule({ message: 'יש להכניס מספר סלולארי ישראלי בעל 10 ספרות.' }).required(),
    payBy: Joi.string().min(2).required(),
    mobile: Joi.string().min(2).required(),
    about: Joi.string().min(2).required()
}

export default updateProfileOwnerSchema