const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Fetched all users successfully",
      data: users,
    });
  } catch (error) {
    console.error(`getAllUsers controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({
      success: true,
      message: "Fetched user successfully",
      data: user,
    });
  } catch (error) {
    console.error(`getUserById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, role, area_id, team_id } = req.body;
    const user = await userService.createUser({
      username,
      email,
      password,
      role,
      area_id,
      team_id,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, area_id, team_id } = req.body;
    const user = await userService.updateUser(id, {
      username,
      email,
      password,
      role,
      area_id,
      team_id,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(`updateUser controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteUser controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// EMPLOYEE CONTROLLER
const getTeamDetails = async (req, res) => {
  try {
    const { id } = req.params; // Assuming user ID is available in req.user after authentication
    const teamDetails = await userService.getTeamDetails(id);
    res.status(200).json({
      success: true,
      message: "Fetched team details successfully",
      data: teamDetails,
    });
  } catch (error) {
    console.error(`getTeamDetails controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team details",
    });
  }
};

const getAssignedComplaints = async (req, res) => {
  try {
    const { id } = req.params; // Assuming user ID is available in req.user after authentication
    const complaints = await userService.getAssignedComplaints(id);
    res.status(200).json({
      success: true,
      message: "Fetched assigned complaints successfully",
      data: complaints,
    });
  } catch (error) {
    console.error(`getAssignedComplaints controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned complaints",
    });
  }
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params; // Complaint ID passed as a URL parameter
    const { status } = req.body; // New status passed in the request body

    const updatedComplaint = await userService.updateComplaintStatus(
      id,
      status
    );
    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: updatedComplaint,
    });
  } catch (error) {
    console.error(`updateComplaintStatus controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update complaint status",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // Employee
  getTeamDetails,
  getAssignedComplaints,
  updateComplaintStatus,
};
