require('dotenv').config()
const validator = process.env.VALIDATOR
const DogValidation = require('./joi/DogValidation');

const validateDog = (review) => {
    if(validator === 'Joi') return DogValidation(review);
}

exports.validateDog = validateDog