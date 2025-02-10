const express = require("express");
const router = express.Router();
const resourceController = require("../controller/resource.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([
    USER_ROLES.ADMIN,
    USER_ROLES.EMPLOYEE,
    USER_ROLES.END_USER,
    USER_ROLES.VENDOR,
  ]),
  resourceController.getAllResources
);
router.get(
  "/:id",
  verifyRole([
    USER_ROLES.ADMIN,
    USER_ROLES.EMPLOYEE,
    USER_ROLES.END_USER,
    USER_ROLES.VENDOR,
  ]),
  resourceController.getResourceById
);
router.post(
  "/",
  verifyRole([USER_ROLES.ADMIN]),
  resourceController.createResource
);
router.put(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resourceController.updateResource
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resourceController.deleteResource
);

module.exports = router;
