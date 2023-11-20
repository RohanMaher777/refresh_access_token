require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const port = process.env.PORT;
const Routes = require("./src/routes/user.route")

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));


app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/token", Routes)

app.listen(port, () => {
    console.log(`server is running on the ${port}`)
})

