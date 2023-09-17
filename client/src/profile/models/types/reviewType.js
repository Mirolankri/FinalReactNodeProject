import { shape, string, number } from "prop-types"

const reviewType = shape({
    __v: number,
    _id: string,
    content: string.isRequired,
    createdAt: string.isRequired,
    profile_id: string.isRequired,
    rate: number.isRequired,
    user_id: string.isRequired,
})

export default reviewType