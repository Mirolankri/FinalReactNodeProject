import Joi from 'joi'

const updateProfileReviewSchema = {
    content: Joi.string().min(2).max(256).required(),
    rate: Joi.number().min(1).max(5).required()
}

export default updateProfileReviewSchema