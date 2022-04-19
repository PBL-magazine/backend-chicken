const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")
dotenv.config({ path: "./utils/config.env" })

const sequelize = new Sequelize(
  "database_development",
  process.env.SQL_ID,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_SERVER_IP,
    port: process.env.SQL_PORT,
    dialect: "mariadb",
  }
)

sequelize.authenticate().then((err) => {
  console.log("Connection has been established successfully.")
})

module.exports = {
    sequelize
}
