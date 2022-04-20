const db = require("../models/index")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")

dotenv.config({ path: "../../utils/config.env" })
const Users = db.users
/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

class Repository {
  SignUp = async (data) => {
    const { email, nickname, hasedPassword } = data

    await Users.create({
      email: email,
      nickname: nickname,
      password: hasedPassword,
    })
  }

  searchByEmail = async (email) => {
    return await Users.findOne({
      where: {
        email: email,
      },
    })
  }
}

const user = new Repository()

const userService = {
  userRegister: async (data) => {
    const { email, nickname, password } = data
    const hasedPassword = await bcrypt.hash(password, 10)

    return await user
      .SignUp({ email, nickname, hasedPassword })
      .then((result) => {
        console.log(result)
      })
  },

  userLogin: async (email, inputPassword) => {
    return await user
      .searchByEmail(email)
      .then((result) => {
        const { user_id, email, password, nickname, role } = result

        if (bcrypt.compare(inputPassword, password)) {
          const token = jwt.sign(
            { user_id: user_id, email: email, role : role, nickname: nickname },
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
