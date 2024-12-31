
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const CustomError = require('./utils/customError')
const globalErrorHandler = require('./controller/errorController')
const app = express()
 

// Middlewares
app.use(cors(
    {
        origin: 'http://localhost:5173', 
        credentials:true,
    }
));
app.use(express.json());

//DB Connect
connectDB();

// port
PORT=5000


/*Routes*/

// user routes
<<<<<<< HEAD
app.use("/api/v1/", require("./routes/UserRoutes"));
=======
app.use("/api/v1/users", require("./routes/userRoutes"));
>>>>>>> upstream/main

//pharmacy routes
app.use("/api/v1/pharmacies", require("./routes/pharmacyRoutes"));

<<<<<<< HEAD

//medicine routes
app.use("/api/v1/", require("./routes/MedicneRoutes"));
=======
//medicine routes
app.use("/api/v1/medicines", require("./routes/MedicineRoutes"));

//application routes
app.use("/api/v1/applications", require("./routes/applicationRoutes"));
>>>>>>> upstream/main

//search routes
app.use("/api/v1/", require("./routes/searchRoutes"));

<<<<<<< HEAD

=======
>>>>>>> upstream/main

// Testing
app.get('/', (req, res) => {
    res.send("hello world")
})

//Handle not Found
app.all('*', (req, res, next) => {
    next(new CustomError(`Can't find ${req.originalUrl} on the server.`,404))
})

// Global error handling middleware
app.use(globalErrorHandler)

const server = app.listen(PORT, () => {
    console.log("Server is listesning on port:", PORT)
})

// Handle All unhandled promise rejections  
process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message);
    console.log("unhandled rejection occured! shutting down...")
    server.close(() => {
        process.exit(1);
    });
})

// Handle All uncought exception 
process.on('uncaughtException', (error) => {
    console.log(error.name, error.message);
    console.log("unhandled rejection occured! shutting down...")
    process.exit(1);
})

 
 