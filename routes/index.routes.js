const router = require("express").Router();

router.use("/pitches", require("./pitches.routes"))
router.use("/auth", require("./auth.routes"))
router.use("/places", require("./places.routes"))
router.use("/user", require("./user.routes"))
router.use("/upload", require('./upload.routes'))

module.exports = router
