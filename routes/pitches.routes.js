const router = require("express").Router()
const Pitch = require("../models/Pitch.model")
const Place = require("../models/Place.model")
const { checkRole } = require('./../middlewares/route-guard')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')


// Get all pitches
router.get("/getAllPitches", (req, res) => {
    Pitch
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Get one pitch
router.get("/getOnePitch/:pitch_id", (req, res) => {
    const { pitch_id } = req.params

    Pitch
        .findById(pitch_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Create pitch
router.get("/savePitch", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {
    Place
        .find()
        .select('name _id')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post("/savePitch", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {
    const { name, meters, diff, points, quickdraws, sector, place_id} = req.body

    Pitch
        .create({ name, meters, diff, points, quickdraws, sector })
        .then(response => {
            Place
                .findByIdAndUpdate(place_id, { $push: { 'pitch': response._id } }, { new: true })
                .then(response => res.status(200).json(response))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

//Update pitch
router.put("/update/:pitch_id", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {
    const { pitch_id } = req.params
    const { name, meters, diff, points, quickdraws, sector } = req.body


    Pitch
        .findByIdAndUpdate(pitch_id, { name, meters, diff, points, quickdraws, sector }, { new: true })
        .then(updatedPitch => res.json(updatedPitch))
        .catch(err => res.status(500).json(err))
})

//Delete pitch
router.delete("/delete/:pitch_id", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {
    const { pitch_id } = req.params

    Pitch
        .findByIdAndDelete(pitch_id)
        .then(deletedPitch => res.json(deletedPitch))
        .catch(err => res.status(500).json(err))
})

module.exports = router