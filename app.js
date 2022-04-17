const express = require("express")
const app = express()

const morgan = require("morgan")
const cors = require("cors")
// const api = require("./router/routers")
const router = require("./router/postRouter")

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))

app.use("/api", router)
// app.use("/api", router)
// app.use("/api", router)

const PORT = 5500

app.listen(PORT, () => {
  console.log(`서버가 요청을 받을 준비가 됐어요 ${PORT}`)
})
