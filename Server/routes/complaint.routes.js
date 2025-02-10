const express = require("express");
const router = express.Router();
const complaint_controller = require("../controller/complaint.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  complaint_controller.getAllComplaints
);
router.get(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE, USER_ROLES.END_USER]),
  complaint_controller.getComplaintById
);
router.post(
  "/",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.END_USER]),
  complaint_controller.createComplaint
);
router.put(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.END_USER]),
  complaint_controller.updateComplaint
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  complaint_controller.deleteComplaint
);

// Admin actions
router.put(
  "/assignComplaint/:id",
  verifyRole([USER_ROLES.ADMIN]),
  complaint_controller.assignComplaint
);

module.exports = router;
