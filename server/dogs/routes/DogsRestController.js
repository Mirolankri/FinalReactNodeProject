const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { validateDog } = require('../validations/DogValidationService')
const normalizeDog = require('../helpers/normalizeDog')
const DogsSchema = require("../models/mongoDB/Dog")
const { DeleteDog, getMyDogs, CreateDog, getDogByID, UpdateDog } = require('../models/AccessDataService')


router.get('/', async (req, res) => {
    const UserID = req.session.Site?.UserID;
    try {
        if(!UserID)
            throw new Error('משתמש לא נמצא')
        
        const GetAllDogs = await getMyDogs(UserID)

        return res.send(GetAllDogs)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
router.post('/', async (req, res) => {
    let _DogData = req.body
    try {
        const { error } = validateDog(_DogData)
        if(error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)
        
        _DogData = normalizeDog(_DogData) // SEND ID FROM AUTH
        _DogData = await CreateDog(_DogData)

        return res.status(201).send(_DogData)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
router.get('/:id', async (req, res) => {
    const DogID = req.params.id
    try {
        let GetDog = await getDogByID(DogID)
        return res.send(GetDog)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
router.put('/:id',async (req, res) => {
    const DogID = req.params.id
    const UserID = req.session.Site?.UserID;
    const body = req.body
    try {
        let Dog = await UpdateDog(DogID,UserID,body)
        return res.send(Dog)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
router.delete('/:id',async (req, res) => {
    const DogID = req.params.id
    const UserID = req.session.Site?.UserID;
    try {
        let Dog = await DeleteDog(DogID,UserID)
        return res.send(Dog)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})


module.exports = router