const { User, Area, Team, Complaint } = require("../models/index");
const { USER_ROLES } = require("../utils/constants");
const { v4: uuidv4 } = require("uuid");
const { COMPLAINT_STATUS } = require("../utils/constants");

// ADMIN SERVICES

// Fetch all users
const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        { model: Area, attributes: ["area_name"] },
        { model: Team, attributes: ["team_name"] },
      ],
    });
    return users;
  } catch (error) {
    console.error(`getAllUsers service error: ${error}`);
    throw new Error("Error fetching users");
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error(`getUserById service error: ${error}`);
    throw new Error("Error fetching user");
  }
};

// Create a new user
const createUser = async ({
  username,
  email,
  password,
  role,
  area_id,
  team_id,
}) => {
  try {
    // Validate role
    if (!Object.values(USER_ROLES).includes(role)) {
      throw new Error(
        `Invalid role. Must be one of ${Object.values(USER_ROLES).join(", ")}`
      );
    }

    // If role is EMPLOYEE, team_id is required
    if (role === USER_ROLES.EMPLOYEE && !team_id) {
      throw new Error("team_id is required for employees.");
    }

    // If role is EMPLOYEE, validate team_id
    if (role === USER_ROLES.EMPLOYEE && team_id) {
      const team = await Team.findByPk(team_id);
      if (!team) throw new Error("Invalid team_id. Team does not exist.");
    }

    // If role is not EMPLOYEE OR ADMIN, validate area_id
    if (![USER_ROLES.EMPLOYEE, USER_ROLES.ADMIN].includes(role)) {
      if (!area_id)
        throw new Error("area_id is required for non-employee roles.");

      const area = await Area.findByPk(area_id);
      if (!area) throw new Error("Invalid area_id. Area does not exist.");
    }

    // If role is EMPLOYEE, set area_id to null
    if (role === USER_ROLES.EMPLOYEE) {
      area_id = null; // Set to null for employees
    }

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password,
      role,
      area_id, // Will be null if EMPLOYEE
      team_id, // Only assigned if employee
      created_at: new Date(),
    };

    return await User.create(newUser);
  } catch (error) {
    console.error(`createUser service error: ${error}`);
    throw new Error(error.message || "Error creating user");
  }
};

// Update a user
const updateUser = async (
  id,
  { username, email, password, role, area_id, team_id }
) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    // Validate role
    if (role && !Object.values(USER_ROLES).includes(role)) {
      throw new Error(
        `Invalid role. Must be one of ${Object.values(USER_ROLES).join(", ")}`
      );
    }

    // If role is EMPLOYEE, team_id is required
    if (role === USER_ROLES.EMPLOYEE && !team_id) {
      throw new Error("team_id is required for employees.");
    }

    // If role is EMPLOYEE, validate team_id
    if (role === USER_ROLES.EMPLOYEE && team_id) {
      const team = await Team.findByPk(team_id);
      if (!team) throw new Error("Invalid team_id. Team does not exist.");
    }

    // If role is not EMPLOYEE, validate area_id
    if (role !== USER_ROLES.EMPLOYEE && area_id) {
      const area = await Area.findByPk(area_id);
      if (!area) throw new Error("Invalid area_id. Area does not exist.");
    }

    // If role is EMPLOYEE, set area_id to null
    if (role === USER_ROLES.EMPLOYEE) {
      area_id = null; // Set to null for employees
    }

    await user.update({
      username,
      email,
      password,
      role,
      area_id, // updated as null if EMPLOYEE
      team_id, // updated only if employee
      updated_at: new Date(),
    });

    return user;
  } catch (error) {
    console.error(`updateUser service error: ${error}`);
    throw new Error(error.message || "Error updating user");
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(`deleteUser service error: ${error}`);
    throw new Error("Error deleting user");
  }
};

// EMPLOYEE SERVICES

// Fetch team details of the logged-in employee
const getTeamDetails = async (employeeId) => {
  try {
    const employee = await User.findByPk(employeeId);
    if (!employee || employee.role !== USER_ROLES.EMPLOYEE) {
      throw new Error("Invalid employee ID or the user is not an employee.");
    }

    const team = await Team.findByPk(employee.team_id);
    if (!team) {
      throw new Error("Team not found for the employee.");
    }

    return team;
  } catch (error) {
    console.error(`getTeamDetails service error: ${error}`);
    throw new Error(error.message || "Error fetching team details");
  }
};

// Fetch list of complaints assigned to the employee's team
const getAssignedComplaints = async (employeeId) => {
  try {
    const employee = await User.findByPk(employeeId);
    if (!employee || employee.role !== USER_ROLES.EMPLOYEE) {
      throw new Error("Invalid employee ID or the user is not an employee.");
    }

    const complaints = await Complaint.findAll({
      where: { team_id: employee.team_id },
    });

    return complaints;
  } catch (error) {
    console.error(`getAssignedComplaints service error: ${error}`);
    throw new Error(error.message || "Error fetching assigned complaints");
  }
};

const updateComplaintStatus = async (id, status) => {
  try {
    // Validate status
    if (!Object.values(COMPLAINT_STATUS).includes(status)) {
      throw new Error(
        `Invalid status. Must be one of ${Object.values(COMPLAINT_STATUS).join(
          ", "
        )}`
      );
    }

    // Find the complaint
    const complaint = await Complaint.findByPk(id);
    if (!complaint) {
      throw new Error("Complaint not found");
    }

    // Update the complaint's status
    complaint.complaint_status = status;
    await complaint.save();

    return complaint;
  } catch (error) {
    console.error(`updateComplaintStatus service error: ${error}`);
    throw new Error(error.message || "Error updating complaint status");
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
