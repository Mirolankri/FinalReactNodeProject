import Joi from 'joi'

const updateProfileImageSchema = {
    profileImage: Joi.string().ruleset.regex(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/).rule({ message: 'ניתן להעלות קבצים בפורמט jpg, jpeg, png בלבד.' }).required()
}

export default updateProfileImageSchema