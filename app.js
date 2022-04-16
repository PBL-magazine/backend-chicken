const express = require("express")
const app = express()
const sequelize = require("./models/index")
// const router = express.Router()
// const auth = require("./auth")
// const register = require("./registerAPI")
// const userinf = require("./info")
const morgan = require("morgan")
const cors = require("cors")
const api = require("./router/routers")
// const sequealizlite= require("./sql")

// const MongoUri= "mongodb+srv://diasm:83XZZ8LwO0rI95en@cluster0.mye6i.mongodb.net/cluster0?retryWrites=true&w=majority"


// mongoose.connect(MongoUri, {
//         useNewUrlParser: true,
//     useUnifiedTopology: true,
// })


app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false}) )

sequelize
app.use("/api", api)


const PORT = 5500

app.listen(PORT, () => {
    console.log(`서버가 요청을 받을 준비가 됐어요 ${PORT}`)
})





