const express = require("express");
const router = express.Router();
const resource_type_controller = require("../controller/resource_type.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([USER_ROLES.ADMIN]),
  resource_type_controller.getAllResourceTypes
);
router.get(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resource_type_controller.getResourceTypeById
);
router.post(
  "/",
  verifyRole([USER_ROLES.ADMIN]),
  resource_type_controller.createResourceType
);
router.put(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resource_type_controller.updateResourceType
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resource_type_controller.deleteResourceType
);

module.exports = router;
