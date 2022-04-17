const { sequelize } = require("../../utils/dbConfig")
const { Sequelize, DataTypes } = require("sequelize")

sequelize.authenticate().then((err) => {
  console.log("connection has been established Suc")
}).catch((err)=>{
  console.log("문제가 발생했습니다")
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./userModel")(sequelize, DataTypes)
db.likes = require("./likeModel")(sequelize, DataTypes)
db.comments = require("./commentModel")(sequelize, DataTypes)
db.posts = require("./postModel")(sequelize, DataTypes)

// posts
db.users.hasMany(db.posts, { foreignKey: "user_id", as: "post" })
db.posts.belongsTo(db.users, { foreignKey: "user_id", as: "user" })

// likes
db.users.hasMany(db.likes, { foreignKey: "user_id", as: "like" })
db.posts.hasMany(db.likes, { foreignKey: "post_id", as: "like" })
db.likes.belongsTo(db.users, { foreignKey: "user_id", as: "user" })
db.likes.belongsTo(db.posts, { foreignKey: "post_id", as: "post" })

//commnet
db.users.hasMany(db.comments, { foreignKey: "user_id", as: "comment" })
db.posts.hasMany(db.comments, { foreignKey: "post_id", as: "comment" })
db.comments.belongsTo(db.users, { foreignKey: "user_id", as: "user" })
db.comments.belongsTo(db.posts, { foreignKey: "post_id", as: "post" })

sequelize
  .sync({ force: false })
  .then((result) => {
      console.log(`output : ${result}` )
  })
  .catch((err) => {
    console.log(err)
  })

module.exports =  db 
