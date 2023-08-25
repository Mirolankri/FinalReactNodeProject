const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateProfile } = require('../validations/userValidationService')
const { createUpdateProfile, getProfile, getProfileDataForReview } = require('../models/profileAccessDataService')
const normalizeProfile = require('../helpers/normalizeProfile')
const { uploadImage } = require('../helpers/uploadImage')
// const auth = require('../../auth/authService')

router.post('/', async (req, res) => {
	// NEED TO AUTH
	try {
		// const user = req.user
		let profile = req.body

		const { error } = validateProfile(profile)
        if (error) return handleError(res, 400, `Joi Error : ${error.details[0].message}`)

		profile = normalizeProfile(profile)
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

router.get('/data_for_review/:id', async (req, res) => {
	try {
		const userId = req.params.id
		const profile = await getProfileDataForReview(userId)
		return res.send(profile)
	} catch (error) {
		return handleError(res, error.status, error.message)
	}
})

router.post('/update_profile_image', uploadImage, async (req, res) => {
	try {
		const user_id = req.body.userId
		console.log(user_id);
		const filePath = `/profiles/${req.file.filename}`
		res.status(200).json({ message: 'File uploaded successfully', image: filePath })
	} catch (error) {
		console.log(error.message);
		return handleError(res, error.status, error.message)
	}
} )

module.exports = router