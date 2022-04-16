const { DataTypes } = require("sequelize")
const { Users } = require("./users")
const { Posts } = require("./posts")
const { sequelize } = require("../utils/dbConfig")

const Likes = sequelize.define(
  "Likes",
  {
    dummy: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'like',
    tableName: 'likes',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
  //   { timestamps : false, sequelize }
)

module.exports = {
  Likes,
}
