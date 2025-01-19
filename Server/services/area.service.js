const { Area } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

const getAllAreas = async () => {
  try {
    const Areas = await Area.findAll(); // Fetch all records
    return Areas; // Store result in variable and return it
  } catch (error) {
    console.error(`getAllAreas service error: ${error}`);
    throw new Error("Error fetching areas");
  }
};

// Fetch area by ID
const getAreaById = async (id) => {
  try {
    const area = await Area.findByPk(id);
    if (!area) throw new Error("Area not found");
    return area;
  } catch (error) {
    console.error(`getAreaById service error: ${error}`);
    throw new Error("Error fetching area");
  }
};

// Create a new area
const createArea = async ({ area_name, description }) => {
  try {
    const newArea = {
      id: uuidv4(),
      area_name,
      description,
      created_at: new Date(),
    };
    const createdArea = await Area.create(newArea);
    return createdArea;
  } catch (error) {
    console.error(`createArea service error: ${error}`);
    throw new Error("Error creating area");
  }
};

// Update an area
const updateArea = async (id, { area_name, description }) => {
  try {
    const area = await Area.findByPk(id);
    if (!area) throw new Error("Area not found");
    await area.update({
      area_name,
      description,
      updated_at: new Date(),
    });
    return area; // Store result in variable and return it
  } catch (error) {
    console.error(`updateArea service error: ${error}`);
    throw new Error("Error updating area");
  }
};

// Delete an area
const deleteArea = async (id) => {
  try {
    const area = await Area.findByPk(id);
    if (!area) throw new Error("Area not found");
    await area.destroy();
    const result = { message: "Area deleted successfully" }; // Store result in variable
    return result; // Return the result message
  } catch (error) {
    console.error(`deleteArea service error: ${error}`);
    throw new Error("Error deleting area");
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
