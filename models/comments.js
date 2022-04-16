const { Model, DataTypes } = require("sequelize")
const { Users } = require("./users.js")
const { Posts } = require("./posts.js")
const { sequelize } = require("../utils/dbConfig")

const Comments = sequelize.define(
  "Comments",
  {
    comment_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },{
    sequelize,
    modelName: 'Comment',
    // tableName: 'Comments',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
  //   { timestamps : false, sequelize }
)


module.exports = {
  Comments,
}
