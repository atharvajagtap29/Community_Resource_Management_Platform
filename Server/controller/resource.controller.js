const resourceService = require("../services/resource.service");

const getAllResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllResources();
    res.status(200).json({
      success: true,
      message: "Fetched all resources successfully",
      data: resources,
    });
  } catch (error) {
    console.error(`getAllResources controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
    });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await resourceService.getResourceById(id);
    res.status(200).json({
      success: true,
      message: "Fetched resource successfully",
      data: resource,
    });
  } catch (error) {
    console.error(`getResourceById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to fetch resource",
    });
  }
};

const createResource = async (req, res) => {
  try {
    const { resource_name, resource_type_id, area_id, description } = req.body;
    const resource = await resourceService.createResource({
      resource_name,
      resource_type_id,
      area_id,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: resource,
    });
  } catch (error) {
    console.error(`createResource controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource_name, resource_type_id, area_id, description } = req.body;
    const resource = await resourceService.updateResource(id, {
      resource_name,
      resource_type_id,
      area_id,
      description,
    });
    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: resource,
    });
  } catch (error) {
    console.error(`updateResource controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await resourceService.deleteResource(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteResource controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: "Failed to delete resource",
    });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
