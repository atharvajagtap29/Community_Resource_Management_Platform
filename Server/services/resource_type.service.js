const { Resource_Type } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

// Fetch all resource types
const getAllResourceTypes = async () => {
  try {
    const resourceTypes = await Resource_Type.findAll(); // Fetch all resource types
    return resourceTypes; // Store result in variable and return it
  } catch (error) {
    console.error(`getAllResourceTypes controller error: ${error}`);
    throw new Error("Error fetching resource types");
  }
};

// Fetch resource type by ID
const getResourceTypeById = async (id) => {
  try {
    const resourceType = await Resource_Type.findByPk(id); // Fetch resource type by primary key
    if (!resourceType) {
      throw new Error("Resource type not found");
    }
    return resourceType; // Store result in variable and return it
  } catch (error) {
    console.error(`getResourceTypeById controller error: ${error}`);
    throw new Error("Error fetching resource type");
  }
};

// Create a new resource type
const createResourceType = async ({ resource_type_name, description }) => {
  try {
    const newResourceType = {
      id: uuidv4(), // Generate new UUID
      resource_type_name: resource_type_name, // Use resource_name instead of resource_name
      description,
      created_at: new Date(),
    };
    const createdResourceType = await Resource_Type.create(newResourceType); // Create resource type
    return createdResourceType; // Store result in variable and return it
  } catch (error) {
    console.error(`createResourceType controller error: ${error}`);
    throw new Error("Error creating resource type");
  }
};

// Update an existing resource type
const updateResourceType = async (id, { resource_type_name, description }) => {
  try {
    const resourceType = await Resource_Type.findByPk(id);
    if (!resourceType) throw new Error("Resource type not found");
    await resourceType.update({
      resource_type_name: resource_type_name,
      description,
      updated_at: new Date(),
    });
    return resourceType; // Store updated resource type and return it
  } catch (error) {
    console.error(`updateResourceType controller error: ${error}`);
    throw new Error("Error updating resource type");
  }
};

// Delete a resource type
const deleteResourceType = async (id) => {
  try {
    const resourceType = await Resource_Type.findByPk(id);
    if (!resourceType) throw new Error("Resource type not found");
    await resourceType.destroy(); // Delete the resource type
    const result = { message: "Resource type deleted successfully" }; // Store result message
    return result; // Return deletion message
  } catch (error) {
    console.error(`deleteResourceType controller error: ${error}`);
    throw new Error("Error deleting resource type");
  }
};

module.exports = {
  getAllResourceTypes,
  getResourceTypeById,
  createResourceType,
  updateResourceType,
  deleteResourceType,
};
