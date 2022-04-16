const { Sequelize, Model, DataTypes } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config({ path: "./utils/config.env" })

const sequelize = new Sequelize(
  "database_development",
  process.env.SQL_ID,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_SERVER_IP,
    dialect: "mysql",
  }
)

sequelize.authenticate().then((err) => {
  console.log("Connection has been established successfully.")
})

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

Users.hasMany(Posts, { foreignKey: "user_id", as: "post" })
Posts.belongsTo(Users, { foreignKey: "user_id", as: "user" })

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
  }
  //   { timestamps : false, sequelize }
)

Users.hasMany(Comments, { foreignKey: "user_id", as: "comment" })
Comments.belongsTo(Users, { foreignKey: "user_id", as: "user" })

Posts.hasMany(Comments, { foreignKey: "post_id", as: "post" })
Comments.belongsTo(Posts, { foreignKey: "post_id", as: "comment" })

const Likes = sequelize.define(
  "Likes",
  {
    dummy: {
      type: DataTypes.INTEGER,
    },
  }
  //   { timestamps : false, sequelize }
)

Users.hasMany(Likes, { foreignKey: "user_id", as: "like" })
Likes.belongsTo(Users, { foreignKey: "user_id", as: "user" })

Posts.hasMany(Likes, { foreignKey: "post_id", as: "like" })
Likes.belongsTo(Posts, { foreignKey: "post_id", as: "post" })

const createDB = async () => {
  await Users.sync({ force: true })
  await Posts.sync({ force: true })
  await Comments.sync({ force: true })
  await Likes.sync({ force: true })

  console.log("The table for the User model was just (re)created!")
}

// createDB()

const createuser = Users.build({
  user_id: 1,
  nickname: "유저1",
  email: "diasm2@gmail.com",
  password: "1234",
  role: 1,
})

const createsomething = Comments.build({
  content: "코멘트1",
  user_id: 1,
})

const excute = async () => {
  await createsomething.save()
}


const read = async () => {
  const user = await Users.findByPk(1)
  const comment = await user.getComment()
  console.log(JSON.stringify(comment, null, 1))
}

const read2 = async () => {
  //   const user = await Users.findByPk(1)
  const user = await Posts.findAll({})
  Posts.count({})

  //   const comment = await user.getPost()
  console.log(JSON.stringify(user, "", 1))
}

read2()

const writePost = async () => {
  const data = await Posts.build({
    content: "코멘트1",
  })
  await data.save()
}

const update = async () => {
  const selectall = await Posts.findAll({
    where : post_id
  })
  const likescounter = () => {
    // {
    // items : { 
    //   post_id : 2
    //   count : 2 }
    // }




    selectall.count({
    where : Posts.findByPk()
  }
  )}
  const data = await Posts.findByPk(1)
  const print = await Posts.update(
    {
      content: "수정된 내용",
    },
    {
      where: {
        post_id: data,
      },
    }
  )
}

module.exports = {
  sequelize,
  Users,
  Comments,
  Likes,
  Posts,
}
