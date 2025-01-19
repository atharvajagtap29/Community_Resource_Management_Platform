const express = require("express");
const router = express.Router();
const complaint_controller = require("../controller/complaint.controller");

// Define routes
router.get("/", complaint_controller.getAllComplaints);
router.get("/:id", complaint_controller.getComplaintById);
router.post("/", complaint_controller.createComplaint);
router.put("/:id", complaint_controller.updateComplaint);
router.delete("/:id", complaint_controller.deleteComplaint);

// Admin actions
router.put("/assignComplaint/:id", complaint_controller.assignComplaint);

module.exports = router;
