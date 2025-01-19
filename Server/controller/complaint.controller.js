const complaintService = require("../services/complaint.service");

// Fetch all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    res.status(200).json({
      success: true,
      message: "Complaints fetched successfully",
      data: complaints,
    });
  } catch (error) {
    console.error(`getAllComplaints controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.getComplaintById(id);
    res.status(200).json({
      success: true,
      message: "Complaint fetched successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(`getComplaintById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { user_id, resource_id, description } = req.body;
    const complaint = await complaintService.createComplaint({
      user_id,
      resource_id,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(`createComplaint controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a complaint
const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const complaint = await complaintService.updateComplaint(id, {
      description,
    });
    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(`updateComplaint controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.deleteComplaint(id);
    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error(`deleteComplaint controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign a complaint
const assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_id } = req.body;

    const complaint = await complaintService.assignTeam(id, team_id);

    res.status(200).json({
      success: true,
      message: "Complaint assigned successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(`assignComplaint controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  assignComplaint,
};
