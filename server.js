const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const ApplicationRoutes = require("./routes/ApplicationRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//DB Connect
connectDB();

/*Routes*/
// user routes
app.use("/api/v1/users", require("./routes/UserRoutes"));
//Application routes
app.use("/api/v1/application", ApplicationRoutes);
//pharmacy routes
app.use("/api/v1/pharmacy", require("./routes/PharmacyRoutes"));
// Testing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  console.log("Server is listesning on port:", process.env.PORT);
});
