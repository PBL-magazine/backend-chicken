const { DataTypes } = require("sequelize")
const {sequelize} = require("../utils/dbConfig")
const { Users } = require("./users")

const Posts = sequelize.define(
  "Posts",
  {
    post_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    image_url: {
      type: DataTypes.STRING(100),
    },
    deleted_at: {
      type: DataTypes.TIME,
    },
  }
  //   { sequelize }
)


module.exports = {
  Posts
}