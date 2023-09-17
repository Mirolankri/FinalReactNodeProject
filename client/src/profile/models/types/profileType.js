import { shape, string } from "prop-types"
import addressType from "./addressType"
import dogWolkerData from "./dogWolkerData"
import nameType from "./nameType"

const profileType = shape({
    _id: string,
    user_id: string.isRequired,
    phone: string.isRequired,
    gender: string.isRequired,
    birth: string.isRequired,
    address: addressType.isRequired,
    data: dogWolkerData.isRequired,
    name: nameType.isRequired,
})

export default profileType