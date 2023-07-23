const Joi = require('joi');

const profileValidation = (profile) => {
    const schema = Joi.object({
        name: Joi.object().keys({
            first: Joi.string().min(2).max(256).required(),
            last: Joi.string().min(2).max(256).required()
        }).required(),
        birth: Joi.date().required().less('now'),
        gender: Joi.string().required(),
        address: Joi.object().keys({
            city: Joi.string().required(),
            street: Joi.string().required(),
        }).required(),
        phone: Joi.string().ruleset.regex(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/).rule({ message: 'יש להכניס מספר סלולארי ישראלי בעל 10 ספרות.' }).required(),
        dogWalker: Joi.object().keys({
            payBy: Joi.string().required(),
            mobile: Joi.string().required(),
            about: Joi.string().min(2).required()
        }).allow(""),
        dogWalker: Joi.object().keys({
            dogCount: Joi.number().required(),
            payBy: Joi.string().required(),
            mobile: Joi.string().required(),
            experience: Joi.string().required(),
            bigDogs: Joi.string().required(),
            about: Joi.string().min(2).required()
        }).allow(""),
        user_id: Joi.string().required()
    })

    return schema.validate(profile)
}

module.exports = profileValidation
