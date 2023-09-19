const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateReview } = require('../validations/reviewValidationService')
const { createReview, getProfileReviews, getProfileData } = require('../models/reviewsAccessDataService')
const normalizeReview = require('../helpers/normalizeReview')

router.post('/', async (req, res) => {
    try {
        let review = req.body
        console.log(review);
        
        const { error } = validateReview(review)
        if(error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)
        
        review = normalizeReview(review) // SEND ID FROM AUTH
        review = await createReview(review)

        return res.status(201).send(review)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        let reviews = await getProfileReviews(id)

        return res.send(reviews)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})

module.exports = router