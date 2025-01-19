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
    const { username, email, password, role, area_id } = req.body;
    const user = await userService.updateUser(id, {
      username,
      email,
      password,
      role,
      area_id,
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
