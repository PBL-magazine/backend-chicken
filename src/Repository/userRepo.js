'use strict'
const db = require("../models/index")
const Users = db.users

module.exports = new class userRepo {
  constructor() { }
  SignUp = async (data) => {
    const { email, nickname, hasedPassword } = data;

    await Users.create({
      email: email,
      nickname: nickname,
      password: hasedPassword,
    });
  };

  searchByEmail = async (email) => {
    return await Users.findOne({
      where: {
        email: email,
      },
    });
  };
};
