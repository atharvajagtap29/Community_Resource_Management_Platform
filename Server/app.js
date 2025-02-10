const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/verify_token.middleware");

const app = express();

// Import routers
const areaRouter = require("./routes/area.routes");
const resourceTypeRouter = require("./routes/resource_type.routes");
const userRouter = require("./routes/user.routes");
const resourceRouter = require("./routes/resource.routes");
const reservationRouter = require("./routes/reservation.routes");
const complaintRouter = require("./routes/complaint.routes");
const teamRouter = require("./routes/team.routes");
const resourceRequestRouter = require("./routes/resource_request.routes");

// 🔹 CORS Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// 🔹 Middleware to parse JSON request bodies
app.use(express.json());

// 🔹 Middleware to parse cookies from incoming requests
app.use(cookieParser());

// 🔹 Apply authentication middleware globally (EXCEPT for login & register)
app.use((req, res, next) => {
  const excludedRoutes = [
    { path: "/api/v1/users", method: "POST" },
    { path: "/api/v1/users/login", method: "POST" },
  ];

  const isExcluded = excludedRoutes.some(
    (route) => req.path === route.path && req.method === route.method
  );

  if (isExcluded) {
    return next(); // Skip authentication for excluded routes
  }

  verifyToken(req, res, next); // Apply authentication for all other routes
});

// 🔹 Protected Routes (Require authentication)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/areas", areaRouter);
app.use("/api/v1/resource_types", resourceTypeRouter);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/resource_request", resourceRequestRouter);

// 🔹 Health Check Route
app.get("/api/v1/healthcheck", (req, res) => {
  try {
    res.status(200).json({
      message: `Project: ${process.env.PROJECT_NAME} is healthy!`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

// Export app for server startup
module.exports = app;
