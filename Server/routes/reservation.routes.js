const express = require("express");
const router = express.Router();
const reservation_controller = require("../controller/reservation.controller");

// Define routes
router.get("/", reservation_controller.getAllReservations);
router.get("/:id", reservation_controller.getReservationById);
router.post("/", reservation_controller.createReservation);
router.put("/:id", reservation_controller.updateReservation);
router.delete("/:id", reservation_controller.deleteReservation);

// Admin actions
router.put("/:id/approve", reservation_controller.approveReservation);
router.put("/:id/reject", reservation_controller.rejectReservation);

module.exports = router;
