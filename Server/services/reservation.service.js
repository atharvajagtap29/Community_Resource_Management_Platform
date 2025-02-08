const { Reservation, Resource, User } = require("../models/index");
const { STATUS } = require("../utils/constants");
const { v4: uuidv4 } = require("uuid");

// Fetch all reservations
const getAllReservations = async () => {
  try {
    return await Reservation.findAll({
      include: [
        { model: Resource, attributes: ["resource_name"] },
        { model: User, attributes: ["username", "email"] },
      ],
    });
  } catch (error) {
    console.error(`getAllReservations service error: ${error}`);
    throw new Error("Error fetching reservations");
  }
};

// Fetch reservation by ID
const getReservationById = async (id) => {
  try {
    const reservation = await Reservation.findByPk(id, {
      include: [
        { model: Resource, attributes: ["name"] },
        { model: User, attributes: ["name", "email"] },
      ],
    });
    if (!reservation) throw new Error("Reservation not found");
    return reservation;
  } catch (error) {
    console.error(`getReservationById service error: ${error}`);
    throw new Error("Error fetching reservation");
  }
};

// Create a new reservation
const createReservation = async ({
  resource_id,
  user_id,
  start_time,
  end_time,
}) => {
  try {
    const resource = await Resource.findByPk(resource_id);
    if (!resource)
      throw new Error("Invalid resource_id. Resource does not exist.");

    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Invalid user_id. User does not exist.");

    const newReservation = {
      id: uuidv4(),
      resource_id,
      user_id,
      start_time,
      end_time,
      reservation_status: STATUS.PENDING,
      created_at: new Date(),
    };
    return await Reservation.create(newReservation);
  } catch (error) {
    console.error(`createReservation service error: ${error}`);
    throw new Error(error.message || "Error creating reservation");
  }
};

// Update a reservation
const updateReservation = async (
  id,
  { resource_id, user_id, start_time, end_time }
) => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new Error("Reservation not found");

    if (resource_id) {
      const resource = await Resource.findByPk(resource_id);
      if (!resource)
        throw new Error("Invalid resource_id. Resource does not exist.");
    }
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) throw new Error("Invalid user_id. User does not exist.");
    }

    await reservation.update({
      resource_id,
      user_id,
      start_time,
      end_time,
      updated_at: new Date(),
    });
    return reservation;
  } catch (error) {
    console.error(`updateReservation service error: ${error}`);
    throw new Error(error.message || "Error updating reservation");
  }
};

// Delete a reservation
const deleteReservation = async (id) => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new Error("Reservation not found");
    await reservation.destroy();
    return { message: "Reservation deleted successfully" };
  } catch (error) {
    console.error(`deleteReservation service error: ${error}`);
    throw new Error("Error deleting reservation");
  }
};

// Approve a reservation
const approveReservation = async (id) => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new Error("Reservation not found");
    if (reservation.status !== STATUS.PENDING) {
      throw new Error("Only pending reservations can be approved");
    }

    await reservation.update({
      status: STATUS.CONFIRMED,
      updated_at: new Date(),
    });
    return reservation;
  } catch (error) {
    console.error(`approveReservation service error: ${error}`);
    throw new Error(error.message || "Error approving reservation");
  }
};

// Reject a reservation
const rejectReservation = async (id) => {
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) throw new Error("Reservation not found");
    if (reservation.status !== STATUS.PENDING) {
      throw new Error("Only pending reservations can be rejected");
    }

    await reservation.update({
      status: STATUS.REJECTED,
      updated_at: new Date(),
    });
    return reservation;
  } catch (error) {
    console.error(`rejectReservation service error: ${error}`);
    throw new Error(error.message || "Error rejecting reservation");
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
