const router = require("express").Router()
const { ValidationError } = require("sequelize")

const USER_SERVICE = require("../service/userService")

router.post("/users/signup", async (req, res) => {
  try {
    const { email, nickname, password } = req.body

    await USER_SERVICE.userRegister({ email, nickname, password })
    res.status(201).send("done")

  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(500).send()
      return e.errors.map((a) => console.error(a.message))
    }
  }
})

router.post("/users/signin", async (req, res) => {
  const { email, password } = req.body

  if (email == null && password == null) {
    return res.status(400).send("please enter email and password")
  }
  try {
    const token = await USER_SERVICE.userLogin(email, password)
    req.session.token = token

    res.status(200).send("done")

  } catch {
    res.status(500).send()
  }
})

module.exports = router
