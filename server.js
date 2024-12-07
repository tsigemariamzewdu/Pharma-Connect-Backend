const express = require('express')
require('dotenv').config()


const app = express()


// Testing
app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(process.env.PORT, () => {
    console.log("Server is listesning on port:", process.env.PORT)
})