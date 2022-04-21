const router = require("express").Router()
const auth = require("../auth/auth")
const Message = require("../../utils/msg")
const { ValidationError } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config({ path: "../../utils/config.env" })

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
    // req.header.authorization = token
    req.session.token = token
    
    res.status(200).send({
      ok: true,
    })
  } catch {
    res.status(500).send(Message.errMsg.Err500)
  }
})

router.get("/users/auth", auth, async (req, res) => {
  console.log(res.locals.info)
  try {
    const { user_id, nickname, email, role } = res.locals.info

    return res
      .status(200)
      .send(Message.success({ user_id, nickname, email, role }, "user"))
  } catch (err) {
    console.log(err)
    return res.status(403).send(Message.Err403)
  }
})

module.exports = router
