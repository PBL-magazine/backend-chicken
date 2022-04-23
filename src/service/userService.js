const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const userRepo = require("../Repository/userRepo")

const Message = require("../../utils/msg")

dotenv.config({ path: "../../utils/config.env" })

/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

const userService = {
  userRegister: async (data) => {
    const { email, nickname, password } = data
    const result = await userRepo.searchByEmail(email)

   


    if (result === null) {
      //가입 가능
      const hasedPassword = await bcrypt.hash(password, 10)
      await userRepo
        .SignUp({ email, nickname, hasedPassword })
        .then((result) => {
          return Message.success()
        })
    } else {
      return Message.errMsg.Err409
    }
  },

  userLogin: async (email, inputPassword) => {
    return await userRepo
      .searchByEmail(email)
      .then((result) => {
        const { user_id, email, password, nickname, role } = result

        if (bcrypt.compare(inputPassword, password)) {
          const token = jwt.sign(
            { user_id: user_id, email: email, role: role, nickname: nickname },
            process.env.JWT_SECRET
          )

          console.log("로그인 성공")
          return token
        }
      })
      .catch(() => {
        console.log("cannot find user")
      })
  },
}

module.exports = userService
