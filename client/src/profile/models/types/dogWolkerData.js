import { shape, string, arrayOf } from "prop-types"

const dogWolkerData = shape({
    _id: string,
    about: string.isRequired,
    createdAt: string.isRequired,
    dogs: arrayOf(string).isRequired,
    mobile: string.isRequired,
    payBy: string.isRequired,
    rate: arrayOf(string).isRequired
})

export default dogWolkerData