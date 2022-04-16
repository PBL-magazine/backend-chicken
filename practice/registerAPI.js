const express = require("express")
const router = express.Router()
const User = require("./mongodb/userSchema")
const bcrypt = require("bcrypt")

// 회원가입
router.post("/users", async (req, res) => {
  console.log("hellow")
  const { email, nickname, password, confirmPassword } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다",
    })
    return
  }

  const existsUsers = await User.findOne({
    $or: [{ email }, { nickname }],
  })
  if (!existsUsers) {
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다",
    })
    return
  }

  const user = new User({ email, nickname, hashedPassword })
  await user.save()

  res
    .status(201)
    .send({
      message: `${nickname}님 회원가입이 ${email}  ${hashedPassword} 완료되었습니다.`,
    })

  //email or nickname이 동일한게
})

module.exports = router
