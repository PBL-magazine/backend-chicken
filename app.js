const express = require("express")
const cookieSession = require("cookie-session")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const db = require("./src/models/index")
const path = require("path")

// Controllers
controllers = [
  require("./src/controllers/postController"),
  require("./src/controllers/commentController"),
  require("./src/controllers/likeController"),
  require("./src/controllers/userController"),
]

app.use(
  cookieSession({
    name: "token",
    keys: ["how"],

    maxAge: 24 * 60 * 60 * 1000, //24hours
  })
)
app.use(express.static("src"))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("dev"))
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
