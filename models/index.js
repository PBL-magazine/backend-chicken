const { sequelize } = require("../utils/dbConfig")
const { Users } = require("../models/Users")
const { Posts } = require("../models/Posts")
const { Comments } = require("../models/Comments")
const { Likes } = require("../models/likes")

// posts
Users.hasMany(Posts, { foreignKey: "user_id", as: "post" })
Posts.belongsTo(Users, { foreignKey: "user_id", as: "user" })

// likes
Users.hasMany(Likes, { foreignKey: "user_id", as: "like" })
Posts.hasMany(Likes, { foreignKey: "post_id", as: "like" })
Likes.belongsTo(Users, { foreignKey: "user_id", as: "user" })
Likes.belongsTo(Posts, { foreignKey: "post_id", as: "post" })

//commnet
Users.hasMany(Comments, { foreignKey: "user_id", as: "comment" })
Posts.hasMany(Comments, { foreignKey: "post_id", as: "comment" })
Comments.belongsTo(Users, { foreignKey: "user_id", as: "user" })
Comments.belongsTo(Posts, { foreignKey: "post_id", as: "post" })

sequelize
  .sync({ force: true })
  .then((result) => {
    return Comments.create({
      content: "내용입니다",
      post_id: 1,
      user_id: 2,
    })
  })
  .then((comment) => {
    console.log(comment)
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = sequelize