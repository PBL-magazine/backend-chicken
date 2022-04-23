const jwt = require("jsonwebtoken")
const Message = require("../../utils/msg")
const dotenv = require("dotenv")
const findEmail = require("../repository/userRepo")

dotenv.config({ path: "../../utils/config.env" })
const getAppCookies = (req) => {
  const rawCookies = req.headers.cookie.split("; ")

  const parsedCookies = {}
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=")
    parsedCookies[parsedCookie[0]] = parsedCookie[1]
  })
  return parsedCookies
}

const authMiddleware = async (req, res, next) => {
  try {
    // const bearerHeader = req.session.token
    // console.log(req.headers, + "cookie있어?")

    // console.log(token)

    if (typeof req.headers.cookie !== "undefined") {
      const { token }= getAppCookies(req)
      const { email } = jwt.decode(token, process.env.JWT_SECRECT)

      const result = await findEmail.searchByEmail(email)

      res.locals.info = result.dataValues
      next()
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
