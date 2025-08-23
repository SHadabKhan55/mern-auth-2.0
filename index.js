const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const {connectDB} = require('./config/dbcon')
const app = express()
const {route} = require('./route/route')
app.use(express.json())

app.use(route)
connectDB()







const port = process.env.PORT || 70

app.listen(port,console.log(`server run ${port}`))

