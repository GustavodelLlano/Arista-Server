const router = require("express").Router()
const Place = require("./../models/Place.model")
const Pitch = require("./../models/Pitch.model")
const { checkRole } = require('./../middlewares/route-guard')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


router.get("/getAllPlaces", (req, res) => {

    Place
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.get("/getOnePlace/:place_id", (req, res) => {

    const { place_id } = req.params

    Place
        .findById(place_id)
        .populate("pitch")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post("/savePlace", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {

    Place
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/update/:place_id", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {

    const { place_id } = req.params
   

    Place
        .findByIdAndUpdate(place_id, { ...req.body }, { new: true })
        .then((updatedPlace) => res.json(updatedPlace))
        .catch(err => res.status(500).json(err))
})


router.delete("/delete/:place_id", isAuthenticated, checkRole("ADMIN", "EQUIP"), (req, res) => {

    const { place_id } = req.params

    Place

        .findByIdAndDelete(place_id)
        .then((deletedPlace) => res.json(deletedPlace))
        .catch(err => res.status(500).json(err))
})

module.exports = router