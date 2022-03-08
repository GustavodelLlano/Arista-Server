const checkRole = (...admitedRoles) => (req,res,next) => {
    admitedRoles.includes(req.payload.role) ? next() : res.status(401).json({ message: "Rol no autorizado" })
}

module.exports = {checkRole}