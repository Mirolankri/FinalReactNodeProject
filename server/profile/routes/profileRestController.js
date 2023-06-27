const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateProfile } = require('../validations/userValidationService')
const { createUpdateProfile } = require('../models/profileAccessDataService')

router.post('/', async (req, res) => {
	// Need to add AUTH!!
	try {
		let profile = req.body
        const { error } = validateProfile(profile)
        if (error) return handleError(res, 400, `Joi Error : ${error.details[0].message}`)

        profile = normalizedProfile(profile)
		//Need to create normalizedProfile
		profile = await createUpdateProfile(profile)
		return res.send(profile).status(201)
	} catch (error) {
		return handleError(res, error.status, error.message)
	}
})

module.exports = router