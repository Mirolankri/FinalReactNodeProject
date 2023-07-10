const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateProfile } = require('../validations/userValidationService')
const { createUpdateProfile, getProfile } = require('../models/profileAccessDataService')
const normalizeProfile = require('../helpers/normalizeProfile')

router.post('/', async (req, res) => {
	// Need to add AUTH!!
	try {
		let profile = req.body
		console.log(profile);
        const { error } = validateProfile(profile)
        if (error) return handleError(res, 400, `Joi Error : ${error.details[0].message}`)
		// profile.user_id = req.user._id || '649c9144f490d481a5faf65e'
		profile.user_id = '64a305306a87ab8237080706'
        // profile = normalizeProfile(profile)
		profile = await createUpdateProfile(profile)
		return res.send(profile).status(201)
	} catch (error) {
		return handleError(res, error.status, error.message)
	}
})

router.get('/by_user_id/:id', async (req, res) => {
	try {
		const userId = req.params.id

		const profile = await getProfile(userId)
		return res.send(profile)
	} catch (error) {
		return handleError(res, error.status, error.message)
	}
})

module.exports = router