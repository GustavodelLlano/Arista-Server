const router = require("express").Router()
const User = require("../models/User.model")
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const { checkRole } = require('./../middlewares/route-guard')




router.post("/getAllUsers", (req, res) => {

    let { words } = req.body
    !words && (words = '')

    User
        .find({ username: { $regex: words, "$options": "i" } }).limit(10)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get("/getOneUser/:user_id", (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .populate("favPlaces donePitches.pitch wishPitches friends")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/editOwnProfile", isAuthenticated, (req, res) => {

    User
        .findByIdAndUpdate(req.payload._id, { ...req.body }, { new: true })
        .then(updatedProfile => res.json(updatedProfile))
        .catch(err => res.status(500).json(err))
})

router.put("/edit/:user_id", checkRole('ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User

        .findByIdAndUpdate(user_id, { ...req.body }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err))


})

router.put("/removeFavPlaces/:place_id", isAuthenticated, (req, res) => {

    const { place_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $pull: { "favPlaces": place_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/favPlaces/:place_id", isAuthenticated, (req, res) => {

    const { place_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $push: { "favPlaces": place_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/removeFavPlaces/:place_id", isAuthenticated, (req, res) => {

    const { place_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $pull: { "favPlaces": place_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/donePitches/:pitch_id", isAuthenticated, (req, res) => {

    const { pitch_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $push: { "donePitches": { pitch: pitch_id } } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/removeWishPitches/:pitch_id", isAuthenticated, (req, res) => {

    const { pitch_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $pull: { "wishPitches": pitch_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/wishPitches/:pitch_id", isAuthenticated, (req, res) => {

    const { pitch_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $push: { "wishPitches": pitch_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/add-friend/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $push: { "friends": user_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})

router.put("/removeFriend/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(req.payload._id, { $pull: { "friends": user_id } }, { new: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))

})







module.exports = router