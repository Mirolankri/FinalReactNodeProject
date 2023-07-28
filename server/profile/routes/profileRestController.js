const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateProfile } = require('../validations/userValidationService')
const { createUpdateProfile, getProfile, getProfileDataForReview } = require('../models/profileAccessDataService')
const normalizeProfile = require('../helpers/normalizeProfile')
// const auth = require('../../auth/authService')
// const fs = require('fs')

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

// router.post('/update_profile_image', async (req, res) => {
// 	try {
// 		const profileImage = req.body.profile_image
// 		req.body.profile_id = 1111
// 		const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, '')
// 		const fileExtension = profileImage.substring('data:image/'.length, fileData.indexOf(';base64'))
// 		const filename = `uploaded_${req.body.profile_id}_${Date.now()}.${fileExtension}`

// 		const filePath = path.join(__dirname, 'uploads', filename)

// 		fs.writeFile(filePath, base64Data, 'base64', (err) => {
// 			if (err) {
// 				console.log('Error saving file:', err)
// 				return res.status(500).json({error: 'Failed to save the file'})
// 			}
// 		})

// 		res.json({ message: 'File uploaded successfully', filename })
// 	} catch (error) {
// 		return handleError(res, error.status, error.message)
// 	}
// } )

module.exports = router