const express = require("express")
const cookieSession = require("cookie-session")
const app = express()
const jwt = require("jsonwebtoken")
const morgan = require("morgan")
const cors = require("cors")

app.use(
  cookieSession({
    name: "blog",
    keys: ["how"],

    maxAge: 24 * 60 * 60 * 1000, //24hours
  })
)
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.get("/auth", require("./src/auth/auth"))       // 인증처리 미들웨어
app.use("/api", require("./src/router/routers"))

const PORT = 5500

app.listen(PORT, () => {
  console.log(`서버가 요청을 받을 준비가 됐어요 ${PORT}`)
})
