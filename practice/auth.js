const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const User = require("./models/mongodb/userSchema")

//회원가입 API
router.post("/auth", async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  const user = await User.findOne({ email })

  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    })
    return
  } 
  res.send({
    token: jwt.sign({ userId: user.userId }, "customized-secret-key"),
  })

})


module.exports = router