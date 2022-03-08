const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

const saltRounds = 10

router.post("/signup", (req, res, next) => {

    const { username, email, password } = req.body

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Es necesario introducir email, contraseña u nombre de usuario" })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "Email ya registrado" })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            return User.create({ ...req.body, password: hashedPassword })
        })
        .then(user => res.status(200).json({ _id: user._id, username: user.username }))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})


router.post("/login", (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Por favor, introduce tu email y contraseña" });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "Email no registrado" })
                return
            }
            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, username, role } = foundUser
                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })

            } else {
                res.status(401).json({ message: "No ha sido posible autenticar el usuario" })
            }

        })

        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})

router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})


module.exports = router