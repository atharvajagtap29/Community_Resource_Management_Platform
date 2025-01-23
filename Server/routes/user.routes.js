const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// Define routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Employee routes
router.get("/employee/:id", userController.getTeamDetails);
router.get("/employee/complaints/:id", userController.getAssignedComplaints);
router.put("/employee/complaints/:id", userController.updateComplaintStatus);

module.exports = router;
