const express = require("express");
const router = express.Router();
const resource_type_controller = require("../controller/resource_type.controller");

// Define routes
router.get("/", resource_type_controller.getAllResourceTypes);
router.get("/:id", resource_type_controller.getResourceTypeById);
router.post("/", resource_type_controller.createResourceType);
router.put("/:id", resource_type_controller.updateResourceType);
router.delete("/:id", resource_type_controller.deleteResourceType);

module.exports = router;
