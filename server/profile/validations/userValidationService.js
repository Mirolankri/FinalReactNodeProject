require('dotenv').config()
const profileValidation = require("./joi/profileValidation");
const validator = process.env.VALIDATOR

const validateProfile = (profile) => {
    if(validator === 'Joi') return profileValidation(profile);
}

exports.validateProfile = validateProfile