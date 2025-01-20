const {
  Resource_Request,
  Resource_Type,
  User,
  Area,
} = require("../models/index");
const { STATUS } = require("../utils/constants");
const { v4: uuidv4 } = require("uuid");

// Fetch all resource requests
const getAllResourceRequests = async () => {
  try {
    return await Resource_Request.findAll({
      include: [
        { model: User, attributes: ["username", "email"], as: "vendor" },
        {
          model: Resource_Type,
          attributes: ["resource_type_name"],
          as: "resourceType",
        },
        {
          model: Area,
          attributes: ["area_name"],
          as: "area",
        },
      ],
    });
  } catch (error) {
    console.error(`getAllResourceRequests service error: ${error}`);
    throw new Error("Error fetching resource requests");
  }
};

// Fetch a resource request by ID
const getResourceRequestById = async (id) => {
  try {
    const resourceRequest = await Resource_Request.findByPk(id, {
      include: [
        { model: User, attributes: ["username", "email"], as: "vendor" },
        {
          model: Resource_Type,
          attributes: ["resource_type_name"],
          as: "resourceType",
        },
        {
          model: Area,
          attributes: ["area_name"],
          as: "area",
        },
      ],
    });
    if (!resourceRequest) throw new Error("Resource request not found");
    return resourceRequest;
  } catch (error) {
    console.error(`getResourceRequestById service error: ${error}`);
    throw new Error("Error fetching resource request");
  }
};

// Create a new resource request
const createResourceRequest = async ({
  vendor_id,
  resource_name,
  resource_type_id,
  description,
  area_id, // Added area_id
}) => {
  try {
    const vendor = await User.findByPk(vendor_id);
    if (!vendor) throw new Error("Invalid vendor_id. Vendor does not exist.");

    const resourceType = await Resource_Type.findByPk(resource_type_id);
    if (!resourceType)
      throw new Error(
        "Invalid resource_type_id. Resource type does not exist."
      );

    const area = await Area.findByPk(area_id); // Check if area exists
    if (!area) throw new Error("Invalid area_id. Area does not exist.");

    const newResourceRequest = {
      id: uuidv4(),
      vendor_id,
      resource_name,
      resource_type_id,
      description,
      area_id, // Include area_id when creating
      request_status: STATUS.PENDING,
      created_at: new Date(),
    };

    return await Resource_Request.create(newResourceRequest);
  } catch (error) {
    console.error(`createResourceRequest service error: ${error}`);
    throw new Error(error.message || "Error creating resource request");
  }
};

// Update a resource request
const updateResourceRequest = async (
  id,
  { resource_name, resource_type_id, description, area_id } // Include area_id here
) => {
  try {
    const resourceRequest = await Resource_Request.findByPk(id);
    if (!resourceRequest) throw new Error("Resource request not found");

    if (resource_type_id) {
      const resourceType = await Resource_Type.findByPk(resource_type_id);
      if (!resourceType)
        throw new Error(
          "Invalid resource_type_id. Resource type does not exist."
        );
    }

    if (area_id) {
      const area = await Area.findByPk(area_id);
      if (!area) throw new Error("Invalid area_id. Area does not exist.");
    }

    await resourceRequest.update({
      resource_name,
      resource_type_id,
      description,
      area_id, // Update area_id
      updated_at: new Date(),
    });

    return resourceRequest;
  } catch (error) {
    console.error(`updateResourceRequest service error: ${error}`);
    throw new Error(error.message || "Error updating resource request");
  }
};

// Delete a resource request
const deleteResourceRequest = async (id) => {
  try {
    const resourceRequest = await Resource_Request.findByPk(id);
    if (!resourceRequest) throw new Error("Resource request not found");
    await resourceRequest.destroy();
    return { message: "Resource request deleted successfully" };
  } catch (error) {
    console.error(`deleteResourceRequest service error: ${error}`);
    throw new Error("Error deleting resource request");
  }
};

// Approve a resource request
const approveResourceRequest = async (id) => {
  try {
    const resourceRequest = await Resource_Request.findByPk(id);
    if (!resourceRequest) throw new Error("Resource request not found");

    if (resourceRequest.request_status !== STATUS.PENDING) {
      throw new Error("Only pending resource requests can be approved");
    }

    await resourceRequest.update({
      request_status: STATUS.CONFIRMED,
      updated_at: new Date(),
    });

    return resourceRequest;
  } catch (error) {
    console.error(`approveResourceRequest service error: ${error}`);
    throw new Error(error.message || "Error approving resource request");
  }
};

// Reject a resource request
const rejectResourceRequest = async (id) => {
  try {
    const resourceRequest = await Resource_Request.findByPk(id);
    if (!resourceRequest) throw new Error("Resource request not found");

    if (resourceRequest.request_status !== STATUS.PENDING) {
      throw new Error("Only pending resource requests can be rejected");
    }

    await resourceRequest.update({
      request_status: STATUS.REJECTED,
      updated_at: new Date(),
    });

    return resourceRequest;
  } catch (error) {
    console.error(`rejectResourceRequest service error: ${error}`);
    throw new Error(error.message || "Error rejecting resource request");
  }
};

module.exports = {
  getAllResourceRequests,
  getResourceRequestById,
  createResourceRequest,
  updateResourceRequest,
  deleteResourceRequest,
  approveResourceRequest,
  rejectResourceRequest,
};
