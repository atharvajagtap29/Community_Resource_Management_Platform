const { Team } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

// Fetch all teams
const getAllTeams = async () => {
  try {
    return await Team.findAll();
  } catch (error) {
    console.error(`getAllTeams service error: ${error}`);
    throw new Error("Error fetching teams");
  }
};

// Fetch team by ID
const getTeamById = async (id) => {
  try {
    const team = await Team.findByPk(id);
    if (!team) throw new Error("Team not found");
    return team;
  } catch (error) {
    console.error(`getTeamById service error: ${error}`);
    throw new Error("Error fetching team");
  }
};

// Create a new team
const createTeam = async ({ team_name, description }) => {
  try {
    const newTeam = {
      id: uuidv4(),
      team_name,
      description,
      created_at: new Date(),
    };
    return await Team.create(newTeam);
  } catch (error) {
    console.error(`createTeam service error: ${error}`);
    throw new Error(error.message || "Error creating team");
  }
};

// Update a team
const updateTeam = async (id, { team_name, description }) => {
  try {
    const team = await Team.findByPk(id);
    if (!team) throw new Error("Team not found");

    await team.update({
      team_name,
      description,
      updated_at: new Date(),
    });
    return team;
  } catch (error) {
    console.error(`updateTeam service error: ${error}`);
    throw new Error(error.message || "Error updating team");
  }
};

// Delete a team
const deleteTeam = async (id) => {
  try {
    const team = await Team.findByPk(id);
    if (!team) throw new Error("Team not found");
    await team.destroy();
    return { message: "Team deleted successfully" };
  } catch (error) {
    console.error(`deleteTeam service error: ${error}`);
    throw new Error("Error deleting team");
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
