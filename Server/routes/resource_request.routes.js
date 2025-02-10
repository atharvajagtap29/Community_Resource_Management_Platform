const express = require("express");
const router = express.Router();
const resourceRequestController = require("../controller/resource_request.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([USER_ROLES.ADMIN]),
  resourceRequestController.getAllResourceRequests
);
router.get(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  resourceRequestController.getResourceRequestById
);
router.post(
  "/",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.VENDOR]),
  resourceRequestController.createResourceRequest
);
router.put(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.VENDOR]),
  resourceRequestController.updateResourceRequest
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.VENDOR]),
  resourceRequestController.deleteResourceRequest
);

// Admin actions
router.put(
  "/:id/approve",
  verifyRole([USER_ROLES.ADMIN]),
  resourceRequestController.approveResourceRequest
);
router.put(
  "/:id/reject",
  verifyRole([USER_ROLES.ADMIN]),
  resourceRequestController.rejectResourceRequest
);

module.exports = router;
