require('dotenv').config()
const DB = process.env.DB || 'mongoDB'
const mongoose = require('mongoose')
const ReviewSchema = require('./mongoDB/Review')
const ProfileSchema = require('../../profile/models/mongoDB/Profile')

const createReview = async (normalizeReview) => {
    if(DB === 'mongoDB'){
        try {
            const prevReview = await getUserProfileReview(normalizeReview.user_id, normalizeReview.profile_id)
            if(prevReview) throw new Error ('לא ניתן לכתוב כמה ביקורות על אותו פרופיל')

            const review = new ReviewSchema(normalizeReview)
            await review.save()
            return Promise.resolve(review)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}

const getUserProfileReview = async (user_id, profile_id) => {
    if(DB === 'mongoDB'){
        try {
            const review = await ReviewSchema.findOne({user_id: user_id, profile_id: profile_id})
            return Promise.resolve(review)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const getProfileReviews = async (id) => {
    if(DB === 'mongoDB'){
        try {
            const reviews = await ReviewSchema.find({profile_id: id}).sort({createdAt: -1})
            if(!reviews.length) return ([])

            return Promise.resolve(reviews)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}

module.exports = { createReview, getProfileReviews, getUserProfileReview }