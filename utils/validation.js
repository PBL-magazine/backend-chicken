//validation
const Joi = require("joi")
const Message = require("./msg")
const userRepo = require("../src/Repository/userRepo")

const ValidationMiddleWare = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body

    const result = await userRepo.searchByEmail(email)

    if (result) {
      // 값이 있으면 가입 불가
      res.status(409).send(Message.errMsg.Err409)
    } else {
      Joi.assert(email, ValidationRule.email)
      console.log(password.includes(nickname))
      Joi.assert(password, ValidationRule.password(password.includes(nickname)))
      Joi.assert(nickname, ValidationRule.nickname)

      if (email && password && nickname) {
        console.log("통과완료")
        next()
      } else {
        res.status(422).send(Message.errMsg.Err500)
      }
    }
  } catch (err) {
    console.log(err.details[0].message)
    res.status(500).send({ ok: false, message: err.details[0].message })
  }
}

const ValidationRule = {
  email: Joi.string().email().required().messages({
    "any.required": "이메일을 입력하세요",
    "string.empty": "이메일을 입력하세요",
    "string.base": "이메일 형식에 맞지 않습니다",
    "string.email": "이메일 형식에 맞지 않습니다",
  }),
  password: (isIncluded) =>
    Joi.string().min(4).max(13).alphanum().invalid(isIncluded).messages({
      "any.required": "비밀번호를 입력하세요",
      "string.empty": "비밀번호를 입력하세요.",
      "string.min": "비밀번호는 4~20자 이상으로 입력하세요.",
      "string.max": "비밀번호는 4~20자 이상으로 입력하세요.",
      "string.base": "비밀번호 형식에 맞지 않습니다.",
      "string.invalid": "비밀번호에 닉네임이 포함되어 있습니다.",
    }),
  nickname: Joi.string().min(3).max(20).required().messages({
    "any.required": "닉네임을 입력하세요",
    "string.empty": "닉네임을 입력하세요.",
    "string.min": "닉네임은 3~10자 이내로 입력하세요.",
    "string.max": "닉네임은 3~10자 이내로 입력하세요.",
    "string.base": "닉네임 형식에 맞지 않습니다.",
  }),
}

module.exports = { ValidationMiddleWare, ValidationRule }
