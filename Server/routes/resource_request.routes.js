const express = require("express");
const router = express.Router();
const resourceRequestController = require("../controller/resource_request.controller");

// Define routes
router.get("/", resourceRequestController.getAllResourceRequests);
router.get("/:id", resourceRequestController.getResourceRequestById);
router.post("/", resourceRequestController.createResourceRequest);
router.put("/:id", resourceRequestController.updateResourceRequest);
router.delete("/:id", resourceRequestController.deleteResourceRequest);

// Admin actions
router.put("/:id/approve", resourceRequestController.approveResourceRequest);
router.put("/:id/reject", resourceRequestController.rejectResourceRequest);

module.exports = router;
