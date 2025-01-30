const areasService = require("../services/area.service");

// Get all areas
const getAllAreas = async (req, res) => {
  try {
    const areas = await areasService.getAllAreas();
    res.status(200).json({
      success: true,
      message: "Fetched all areas successfully",
      data: areas,
    });
  } catch (error) {
    console.error(`getAllAreas controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch areas",
    });
  }
};

// Get area by ID
const getAreaById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL
    const area = await areasService.getAreaById(id);
    res.status(200).json({
      success: true,
      message: "Fetched area successfully",
      data: area,
    });
  } catch (error) {
    console.error(`getAreaById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to fetch area",
    });
  }
};

// Create a new area
const createArea = async (req, res) => {
  try {
    const { area_name, description } = req.body;

    console.log(`BODY >>>>> ${JSON.stringify(req.body)}`);

    const area = await areasService.createArea({ area_name, description });
    res.status(201).json({
      success: true,
      message: "Area created successfully",
      data: area,
    });
  } catch (error) {
    console.error(`createArea controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: "Failed to create area",
    });
  }
};

// Update an area
const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { area_name, description } = req.body;
    const area = await areasService.updateArea(id, { area_name, description });
    res.status(200).json({
      success: true,
      message: "Area updated successfully",
      data: area,
    });
  } catch (error) {
    console.error(`updateArea controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: "Failed to update area",
    });
  }
};

// Delete an area
const deleteArea = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL
    const result = await areasService.deleteArea(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteArea controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to delete area",
    });
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
