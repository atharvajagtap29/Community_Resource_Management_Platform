const { Resource, Area, Resource_Type } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

// Fetch all resources
const getAllResources = async () => {
  try {
    return await Resource.findAll({
      // attributes: {
      //   exclude: ["area_id", "resource_type_id"],
      // },
      include: [
        { model: Area, attributes: ["area_name"] },
        { model: Resource_Type, attributes: ["resource_type_name"] },
      ],
    });
  } catch (error) {
    console.error(`getAllResources service error: ${error}`);
    throw new Error("Error fetching resources");
  }
};

// Fetch resource by ID
const getResourceById = async (id) => {
  try {
    const resource = await Resource.findByPk(id, {
      attributes: {
        exclude: ["area_id", "resource_type_id"],
      },
      include: [
        { model: Area, attributes: ["area_name"] },
        { model: Resource_Type, attributes: ["resource_type_name"] },
      ],
    });
    if (!resource) throw new Error("Resource not found");
    return resource;
  } catch (error) {
    console.error(`getResourceById service error: ${error}`);
    throw new Error("Error fetching resource");
  }
};

// Create a new resource
const createResource = async ({
  resource_name,
  resource_type_id,
  area_id,
  description,
}) => {
  try {
    // Validate area_id and resource_type_id
    const area = await Area.findByPk(area_id);
    if (!area) throw new Error("Invalid area_id. Area does not exist.");

    const type = await Resource_Type.findByPk(resource_type_id);
    if (!type)
      throw new Error("Invalid resource_type_id. ResourceType does not exist.");

    const newResource = {
      id: uuidv4(),
      resource_name,
      resource_type_id,
      area_id,
      description,
      created_at: new Date(),
    };
    return await Resource.create(newResource);
  } catch (error) {
    console.error(`createResource service error: ${error}`);
    throw new Error(error.message || "Error creating resource");
  }
};

// Update a resource
const updateResource = async (
  id,
  { resource_name, resource_type_id, area_id, description }
) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) throw new Error("Resource not found");

    // Validate area_id and resource_type_id if provided
    if (area_id) {
      const area = await Area.findByPk(area_id);
      if (!area) throw new Error("Invalid area_id. Area does not exist.");
    }

    if (resource_type_id) {
      const type = await Resource_Type.findByPk(resource_type_id);
      if (!type)
        throw new Error(
          "Invalid resource_type_id. ResourceType does not exist."
        );
    }

    await resource.update({
      resource_name,
      resource_type_id,
      area_id,
      description,
      updated_at: new Date(),
    });
    return resource;
  } catch (error) {
    console.error(`updateResource service error: ${error}`);
    throw new Error(error.message || "Error updating resource");
  }
};

// Delete a resource
const deleteResource = async (id) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) throw new Error("Resource not found");
    await resource.destroy();
    return { message: "Resource deleted successfully" };
  } catch (error) {
    console.error(`deleteResource service error: ${error}`);
    throw new Error("Error deleting resource");
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
