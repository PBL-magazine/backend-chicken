const db = require("../models/index")
const bcrypt = require("bcrypt")
const { ValidationError } = require("sequelize")

const Posts = db.posts
const Comments = db.comments
const Users = db.users

const userRegister = async (req, res) => {
  try {
    const { email, nickname, password } = req.body
    // const salt = await bcrypt.genSalt()
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
  console.log(email)

  const info = await Users.findOne({
    where: {
      email: email,
    },
  })
  console.log(info.password)

  if (email == null) {
    return res.status(400).send("cannot find user")
  }
  try {
    if (await bcrypt.compare(password, info.password)) {
      res.send("Sucess")
    } else {
      res.send("not sucess")
    }
  } catch {
    res.status(500).send()
  }
}

module.exports = {
  userRegister,
  userLogin,
}
