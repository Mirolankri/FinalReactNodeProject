require('dotenv').config()
const validator = process.env.VALIDATOR
const reviewValidation = require('./joi/reviewValidation');

const validateReview = (review) => {
    if(validator === 'Joi') return reviewValidation(review);
}

exports.validateReview = validateReview