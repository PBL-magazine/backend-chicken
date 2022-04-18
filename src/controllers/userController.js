const db = require("../models/index")
const bcrypt = require("bcrypt")
const { ValidationError } = require("sequelize")
const jwt = require("jsonwebtoken")
// const session = require("express-session")

const Posts = db.posts
const Comments = db.comments
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
  userAuth(req, res)

  const info = await Users.findOne({
    where: {
      email: email,
    },
  })

  if (email == null) {
    return res.status(400).send("cannot find user")
  }
  try {
    if (await bcrypt.compare(password, info.password)) {
        // jwt 토큰을 만들어서 보낸다
      res.send("Sucess")
    } else {
      res.send("not sucess")
    }
  } catch {
    res.status(500).send()
  }
}


const userAuth = async (req, res, next) => {
    // cookie-session 라이브러리를 이용해서 발생된 토큰을 클라이언트에 주입
    // userLogin이 완료가 되면 userAuth에서 발생된 토큰을 생성후 헤더에 보낸다
    // 클라이언트에서 받은 토큰을 확인하여 유저 정보를 찾는다
    // 유저 정보를 찾았다면 next를 호출하여 다음 미들웨어로 이동
    // 유저 정보를 찾지 못했다면 에러를 발생시킨다
    // 에러를 발생시키는 방법은 res.status(401).send()

    req.session.user = {
        email: "diasm2@gmail.com",
        nickname: "diasm",
        userId: 1,
    }

    res.end(req.session.user)

}



module.exports = {
  userRegister,
  userLogin,
  userAuth
}
