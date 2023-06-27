const express = require('express')
const router = express.Router()
const UserSchema = require("../../db/schemas/User")
const { handleError } = require('../../utils/errorHandler')
const { validateProfile } = require('../validations/userValidationService')

router.post('/', async (req, res) => {
	try {
		let profile = req.body
        const { error } = validateProfile(profile)
        if (error) return handleError(res, 400, `Joi Error : ${error.details[0].message}`)

        profile = normalizedProfile(profile)

	} catch (error) {
		return handleError(res, error.status, error.message)
	}
})

module.exports = router