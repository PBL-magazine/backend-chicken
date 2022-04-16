"use strict"
const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/dbConfig")

const Users = sequelize.define("Users", {
  user_id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nickname: {
    type: DataTypes.STRING(30),
  },
  email: {
    type: DataTypes.STRING(30),
  },
  password: {
    type: DataTypes.STRING(200),
  },
  role: {
    type: DataTypes.INTEGER,
  },
})

module.exports = {
  Users,
}
