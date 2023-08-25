const multer = require('multer')
const fs = require('fs')

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = 'public/profiles/'
        try {
            fs.mkdirSync(uploadDir, { recursive: true })
            callback(null, uploadDir)
        } catch (error) {
            callback(error)
        }
    },

    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `profile-image-${Date.now()}.${ext}`)
    }
})

const isImage = (req, file, callback) => {
    if(!file.mimetype.startsWith('image')) return callback(new Error ('No image file'))
    return callback(null, true)
}

const upload = multer({
    storage: multerConfig,
    fileFilter: isImage
})

exports.uploadImage = upload.single('profilePhoto')