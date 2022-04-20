const express = require("express")
const cookieSession = require("cookie-session")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const db = require("./src/models/index")

// Controllers
controllers = [
  require("./src/controllers/postController"),
  require("./src/controllers/commentController"),
  require("./src/controllers/likeController"),
  require("./src/controllers/userController"),
]

app.use(
  cookieSession({
    name: "blog",
    keys: ["how"],

    maxAge: 24 * 60 * 60 * 1000, //24hours
  })
)


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use("/api", controllers)

const PORT = 5500
db.sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
