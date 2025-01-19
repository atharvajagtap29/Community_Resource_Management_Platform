const express = require("express");
const router = express.Router();
const resourceController = require("../controller/resource.controller");

// Define routes
router.get("/", resourceController.getAllResources);
router.get("/:id", resourceController.getResourceById);
router.post("/", resourceController.createResource);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
