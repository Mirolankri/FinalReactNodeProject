const SRM2 = {
    type: String,
    trim: true,
    minLength: 2,
    required: false
}

const NRM1 = {
    type: Number,
    trim: true,
    minLength: 1,
    required: true
}
const URLValid = {
    type: String,
    trim: true,
    match: RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g)
}
const PassVALID = {
    type: String,
    trim: true,
    minLength: 3,
    // match: RegExp(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/),
    required: true
}


module.exports = {SRM2,NRM1,URLValid,PassVALID}