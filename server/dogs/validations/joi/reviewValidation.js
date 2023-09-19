const Joi = require('joi')

const reviewValidation = (review) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        name: Joi.string().min(2).max(50).required(),
        gender: Joi.string().required(),
        allergy: Joi.string().min(2).max(3).required(),
        birth: Joi.date().required().less('now'),
        meetdogs: Joi.string().min(2).max(3).required(),
        meetpepole: Joi.string().min(2).max(3).required(),
        about: Joi.string().min(2).max(300),
        active:Joi.boolean()
    
    })

    return schema.validate(review)
}

module.exports = reviewValidation