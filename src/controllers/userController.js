const db = require("../models/index")
const bcrypt = require("bcrypt")
const { ValidationError } = require("sequelize")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv") 

dotenv.config({ path : "../../utils/config.env"})
// const session = require("express-session")

const Users = db.users

const userRegister = async (req, res) => {
  try {
    const { email, nickname, password } = req.body
    const hasedPassword = await bcrypt.hash(password, 10)

    const info = Users.build({
      email: email,
      nickname: nickname,
      password: hasedPassword,
    })
    await info.validate()
    await info.save()
    res.status(201).send()
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(500).send()
      return e.errors.map((a) => console.error(a.message))
    }
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body

  const info = await Users.findOne({
    where: {
      email: email,
    },
  })
  console.log(info)

  if (email == null) {
    return res.status(400).send("cannot find user")
  }
  try {
    if (await bcrypt.compare(password, info.password)) {
      // jwt 토큰을 만들어서 보낸다
      // user_id
      console.log(process.env.JWT_SECRET)

      const token = jwt.sign(
        { user_id: info.user_id, email: email },
        process.env.JWT_SECRET)
    
      req.session.info = token

      // 쿠키 발급
      // 쿠키를 빼서 디비와 비교 후 사용자 권한 확인

      res.send("Sucess")
    } else {
      res.send("not sucess")
    }
  } catch {
    res.status(500).send()
  }
}
// const userAuth = async (req, res, next) => {
//   // cookie-session 라이브러리를 이용해서 발생된 토큰을 클라이언트에 주입
//   // userLogin이 완료가 되면 userAuth에서 발생된 토큰을 생성후 헤더에 보낸다
//   // 클라이언트에서 받은 토큰을 확인하여 유저 정보를 찾는다
//   // 유저 정보를 찾았다면 next를 호출하여 다음 미들웨어로 이동
//   // 유저 정보를 찾지 못했다면 에러를 발생시킨다
//   // 에러를 발생시키는 방법은 res.status(401).send()

//   req.session.user = {
//     email: "diasm2@gmail.com",
//     nickname: "diasm",
//     userId: 1,
//   }

//   res.end(req.session.user)
// }

module.exports = {
  userRegister,
  userLogin,
}
