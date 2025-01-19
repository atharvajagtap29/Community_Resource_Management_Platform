const resourceTypeService = require("../services/resource_type.service");

// Get all resource types
const getAllResourceTypes = async (req, res) => {
  try {
    const resourceTypes = await resourceTypeService.getAllResourceTypes();
    res.status(200).json({
      success: true,
      message: "Fetched all resource types successfully",
      data: resourceTypes,
    });
  } catch (error) {
    console.error(`getAllResourceTypes controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resource types",
    });
  }
};

// Get resource type by ID
const getResourceTypeById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL
    const resourceType = await resourceTypeService.getResourceTypeById(id);
    res.status(200).json({
      success: true,
      message: "Fetched resource type successfully",
      data: resourceType,
    });
  } catch (error) {
    console.error(`getResourceTypeById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to fetch resource type",
    });
  }
};

// Create a new resource type
const createResourceType = async (req, res) => {
  try {
    const { resource_name, description } = req.body;
    const resourceType = await resourceTypeService.createResourceType({
      resource_name,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Resource type created successfully",
      data: resourceType,
    });
  } catch (error) {
    console.error(`createResourceType controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: "Failed to create resource type",
    });
  }
};

// Update a resource type
const updateResourceType = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource_name, description } = req.body;
    const resourceType = await resourceTypeService.updateResourceType(id, {
      resource_name,
      description,
    });
    res.status(200).json({
      success: true,
      message: "Resource type updated successfully",
      data: resourceType,
    });
  } catch (error) {
    console.error(`updateResourceType controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: "Failed to update resource type",
    });
  }
};

// Delete a resource type
const deleteResourceType = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL
    const result = await resourceTypeService.deleteResourceType(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteResourceType controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to delete resource type",
    });
  }
};

module.exports = {
  getAllResourceTypes,
  getResourceTypeById,
  createResourceType,
  updateResourceType,
  deleteResourceType,
};
