const reservationService = require("../services/reservation.service");

// Fetch all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    console.error(`getAllReservations controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationService.getReservationById(id);
    res.status(200).json({
      success: true,
      message: "Reservation fetched successfully",
      data: reservation,
    });
  } catch (error) {
    console.error(`getReservationById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { resource_id, user_id, start_time, end_time } = req.body;
    const reservation = await reservationService.createReservation({
      resource_id,
      user_id,
      start_time,
      end_time,
    });
    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    console.error(`createReservation controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource_id, user_id, start_time, end_time } = req.body;
    const reservation = await reservationService.updateReservation(id, {
      resource_id,
      user_id,
      start_time,
      end_time,
    });
    res.status(200).json({
      success: true,
      message: "Reservation updated successfully",
      data: reservation,
    });
  } catch (error) {
    console.error(`updateReservation controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reservationService.deleteReservation(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteReservation controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve a reservation
const approveReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await reservationService.approveReservation(id);

    res.status(200).json({
      success: true,
      message: "Reservation approved successfully",
      data: updatedReservation,
    });
  } catch (error) {
    console.error(`approveReservation controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject a reservation
const rejectReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await reservationService.rejectReservation(id);

    res.status(200).json({
      success: true,
      message: "Reservation rejected successfully",
      data: updatedReservation,
    });
  } catch (error) {
    console.error(`rejectReservation controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  approveReservation,
  rejectReservation,
};
