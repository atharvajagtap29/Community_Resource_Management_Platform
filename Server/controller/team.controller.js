const teamService = require("../services/team.service");

// Fetch all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json({
      success: true,
      message: "Teams fetched successfully",
      data: teams,
    });
  } catch (error) {
    console.error(`getAllTeams controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch team by ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamService.getTeamById(id);
    res.status(200).json({
      success: true,
      message: "Team fetched successfully",
      data: team,
    });
  } catch (error) {
    console.error(`getTeamById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { team_name, description } = req.body;
    const team = await teamService.createTeam({ team_name, description });
    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    console.error(`createTeam controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a team
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name, description } = req.body;
    const team = await teamService.updateTeam(id, { team_name, description });
    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  } catch (error) {
    console.error(`updateTeam controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a team
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await teamService.deleteTeam(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteTeam controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
