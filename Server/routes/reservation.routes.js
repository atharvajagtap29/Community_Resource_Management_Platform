const express = require("express");
const router = express.Router();
const reservation_controller = require("../controller/reservation.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([USER_ROLES.ADMIN]),
  reservation_controller.getAllReservations
);
router.get(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  reservation_controller.getReservationById
);
router.post(
  "/",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.END_USER]),
  reservation_controller.createReservation
);
router.put(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.END_USER]),
  reservation_controller.updateReservation
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.END_USER]),
  reservation_controller.deleteReservation
);

// Admin actions
router.put(
  "/:id/approve",
  verifyRole([USER_ROLES.ADMIN]),
  reservation_controller.approveReservation
);
router.put(
  "/:id/reject",
  verifyRole([USER_ROLES.ADMIN]),
  reservation_controller.rejectReservation
);

module.exports = router;
