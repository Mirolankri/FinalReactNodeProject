const Joi = require('joi')

const reviewValidation = (review) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        profile_id: Joi.string().required(),
        content: Joi.string().min(2).max(256).required(),
        rate: Joi.number().min(0).max(5).required()
    })

    return schema.validate(review)
}

module.exports = reviewValidation