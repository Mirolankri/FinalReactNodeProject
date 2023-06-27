const express = require ("express")
const router = express.Router()
const UserRoute = require('./User/UserRoute')

const profileRestController = require('../profile/routes/profileRestController')

// const cardsRestController = require("../cards/routes/cardsRestController")
// const usersRestController = require("../users/routes/usersRestController")
// const testRestController = require("../test/routes/testRestController")
// const { handleError } = require("../utils/errorHandler")

router.use("/user",UserRoute)
router.use("/profile", profileRestController)
// router.use("/cards",cardsRestController)
// router.use("/test",testRestController)

router.use((req,res)=>{
    // handleError(res,404,"עמוד לא נמצא")
    res.status(404).json({ message: 'עמוד לא נמצא' });
})

module.exports = router