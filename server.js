const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

//DB Connect
connectDB()



// Testing
app.get('/', (req, res) => {
    res.send("hello world")
})



app.listen(process.env.PORT, () => {
    console.log("Server is listesning on port:", process.env.PORT)
})
