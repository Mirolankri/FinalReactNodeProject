const express = require ("express")
const router = express.Router()
const UserRoute = require('./User/UserRoute')

const profileRestController = require('../profile/routes/profileRestController')
const reviewRestController = require('../reviews/routes/reviewRestController')
const dogsRestController = require('../dogs/routes/reviewRestController')

// const cardsRestController = require("../cards/routes/cardsRestController")
// const usersRestController = require("../users/routes/usersRestController")
// const testRestController = require("../test/routes/testRestController")
// const { handleError } = require("../utils/errorHandler")

router.use("/user",UserRoute)
router.use("/profile", profileRestController)
router.use("/review", reviewRestController)
router.use("/dogs", dogsRestController)
// router.use("/cards",cardsRestController)
// router.use("/test",testRestController)

router.use((req,res)=>{
    // handleError(res,404,"עמוד לא נמצא")
    res.status(404).json({ message: 'עמוד לא נמצא' });
})

module.exports = router