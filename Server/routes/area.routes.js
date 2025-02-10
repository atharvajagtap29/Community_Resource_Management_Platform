const express = require("express");
const router = express.Router();
const areasController = require("../controller/area.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get("/", verifyRole([USER_ROLES.ADMIN]), areasController.getAllAreas);
router.get("/:id", verifyRole([USER_ROLES.ADMIN]), areasController.getAreaById);
router.post("/", verifyRole([USER_ROLES.ADMIN]), areasController.createArea);
router.put("/:id", verifyRole([USER_ROLES.ADMIN]), areasController.updateArea);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  areasController.deleteArea
);

module.exports = router;
