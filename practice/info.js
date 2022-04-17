const authMiddleware = require("./middleware")
const express = require("express")
const router = express.Router()


router.get("/users/me", authMiddleware, async (req, res) => {
    res.send({ user: res.locals.user})
})




module.exports = router
