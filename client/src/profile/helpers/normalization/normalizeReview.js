const normalizeReview = (review) => {
    return {
        user_id: review.user_id,
        profile_id: review.profile_id,
        content: review.content,
        rate: review.rate
    }
}

export default normalizeReview