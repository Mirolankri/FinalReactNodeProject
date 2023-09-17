import { shape, string } from "prop-types"

const addressType = shape({
    _id: string,
    city: string.isRequired,
    street: string.isRequired
})

export default addressType