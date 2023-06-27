const profileValidation = require("./joi/profileValidation");

const validateProfile = (profile) => {
    if(validator === 'Joi') return profileValidation(profile);
}

exports.validateProfile = validateProfile