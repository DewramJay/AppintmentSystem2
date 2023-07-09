require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");
const scheduleRoutes = require("./routes/schedules");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/schedules",scheduleRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}....`));
