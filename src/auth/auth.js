const jwt = require("jsonwebtoken")
const Message = require("../../utils/Msg")
const jm = require("../models/index")
const dotenv = require("dotenv")

const Users = jm.users

dotenv.config({ path: "../../utils/config.env" })

const authMiddleware = async (req, res, next) => {
  // cookie-session 라이브러리를 이용해서 발생된 토큰을 클라이언트에 주입
  try {
    const bearerHeader = req.header["authorization"]
    // console.log(bearerHeader)
    // req.session.bearerHeader = bearerHeader
    // const [tokenType, tokenValue] = bearerHeader.split(" ")

    if (typeof bearerHeader !== "undefined") {
      const info = jwt.decode(bearerHeader, process.env.JWT_SECRECT)

      Users.findOne({
        where: {
          email: info.email,
        },
      }).then((user) => {
        req.token= user.dataValues
      })
      res.status(200).send(Message.success(info, "user"))
    } else {
      res.status(401).send(Message.errMsg.Err401)
    }
  } catch (err) {
    console.log(err)
    if (err.name === "TokenExpiredError") {
      return res.status(419).send(Message.errMsg.Err419)
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send(Message.errMsg.Err401)
    }
    res.status(500).send(Message.errMsg.Err500)
  }
}

module.exports = authMiddleware
