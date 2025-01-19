const { Complaint, Resource, User, Team } = require("../models/index");
const { COMPLAINT_STATUS } = require("../utils/constants"); // Destructured import, which will extract only COMPLAINT_STATUS object from exported module
const { v4: uuidv4 } = require("uuid");

// CRUD logic similar to Reservations, adjusted for Complaint fields
const getAllComplaints = async () => {
  try {
    return await Complaint.findAll({
      include: [
        { model: Resource, attributes: ["resource_name"] },
        { model: User, attributes: ["username", "email"] },
      ],
    });
  } catch (error) {
    console.error(`getAllComplaints service error: ${error}`);
    throw new Error("Error fetching complaints");
  }
};

const getComplaintById = async (id) => {
  try {
    const complaint = await Complaint.findByPk(id, {
      include: [
        { model: Resource, attributes: ["resource_name"] },
        { model: User, attributes: ["username", "email"] },
      ],
    });
    if (!complaint) throw new Error("Complaint not found");
    return complaint;
  } catch (error) {
    console.error(`getComplaintById service error: ${error}`);
    throw new Error("Error fetching complaint");
  }
};

const createComplaint = async ({ resource_id, user_id, description }) => {
  try {
    const resource = await Resource.findByPk(resource_id);
    if (!resource)
      throw new Error("Invalid resource_id. Resource does not exist.");

    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Invalid user_id. User does not exist.");

    console.log(`STATUS >>>>>> ${COMPLAINT_STATUS.PENDING}`);

    const newComplaint = {
      id: uuidv4(),
      resource_id,
      user_id,
      description,
      complaint_status: COMPLAINT_STATUS.PENDING, // Default to "PENDING"
      created_at: new Date(),
    };
    return await Complaint.create(newComplaint);
  } catch (error) {
    console.error(`createComplaint service error: ${error}`);
    throw new Error(error.message || "Error creating complaint");
  }
};

const updateComplaint = async (id, { complaint_text }) => {
  try {
    const complaint = await Complaint.findByPk(id);
    if (!complaint) throw new Error("Complaint not found");

    await complaint.update({
      complaint_text,
      updated_at: new Date(),
    });
    return complaint;
  } catch (error) {
    console.error(`updateComplaint service error: ${error}`);
    throw new Error(error.message || "Error updating complaint");
  }
};

const deleteComplaint = async (id) => {
  try {
    const complaint = await Complaint.findByPk(id);
    if (!complaint) throw new Error("Complaint not found");
    await complaint.destroy();
    return { message: "Complaint deleted successfully" };
  } catch (error) {
    console.error(`deleteComplaint service error: ${error}`);
    throw new Error("Error deleting complaint");
  }
};

const assignTeam = async (id, team_id) => {
  try {
    const complaint = await Complaint.findByPk(id);
    if (!complaint) throw new Error("Complaint not found");

    if (complaint.complaint_status === COMPLAINT_STATUS.PENDING) {
      // Assign team to complaint
      const updatedComplaint = await complaint.update({
        team_id,
        complaint_status: COMPLAINT_STATUS.ASSIGNED,
        updated_at: new Date(),
      });
      return updatedComplaint;
    }
  } catch (error) {
    console.error(`assignTeam service error: ${error}`);
    throw new Error("Error assigning complaint");
  }
};

module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  assignTeam,
};
