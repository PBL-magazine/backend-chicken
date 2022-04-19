const jwt = require("jsonwebtoken")
const jm = require("../models/index")
const dotenv = require("dotenv") 


const Users = jm.users

dotenv.config({ path: "../../utils/config.env" })

const authMiddleware = async (req, res, next) => {
  // cookie-session 라이브러리를 이용해서 발생된 토큰을 클라이언트에 주입
  const token = req.session.token
  const info = jwt.decode(token, process.env.JWT_SECRECT)

  const result = await Users.findOne({
    where: {
      email: info.email,
      user_id: info.user_id,
    },
     attributes : ["user_id", "email", "role" ]
  })

  if (result) {
      res.locals.info = result
  } else {
      res.send("로그인이 필요합니다.")
  }

  next()

}

module.exports = authMiddleware
