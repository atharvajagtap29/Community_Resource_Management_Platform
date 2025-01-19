const express = require("express");
const app = express();
const cors = require("cors");

// Import routers
const areaRouter = require("./routes/area.routes");
const resource_type_router = require("./routes/resource_type.routes");
const userRouter = require("./routes/user.routes");
const resourceRouter = require("./routes/resource.routes");
const reservationRouter = require("./routes/reservation.routes");
const complaintRouter = require("./routes/complaint.routes");
const teamRouter = require("./routes/team.routes");

// CORS middleware
app.use(cors()); // Temporarily allow for all origins. Later only allow requests coming from react frontend

// Parse json request bodies
app.use(express.json());

// Test route example
app.get("/api/v1/healthcheck", (req, res) => {
  try {
    res.status(200).json({
      message: `Project: ${process.env.PROJECT_NAME} is healthy!`,
      success: "true",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: "false",
    });
  }
});

// Call routers
app.use("/api/v1/areas", areaRouter);
app.use("/api/v1/resource_types", resource_type_router);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/teams", teamRouter);

// Export app for server startup
module.exports = app;
