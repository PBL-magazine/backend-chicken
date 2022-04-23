//validation
const Joi = require("joi")


const Validation = {
    email : Joi.string().min().max().email().required(),
    password : Joi.min().max().password()
}


module.exports = Validation

