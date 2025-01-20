const resourceRequestService = require("../services/resource_request.service");

// Fetch all resource requests
const getAllResourceRequests = async (req, res) => {
  try {
    const resourceRequests =
      await resourceRequestService.getAllResourceRequests();
    res.status(200).json({
      success: true,
      message: "Resource requests fetched successfully",
      data: resourceRequests,
    });
  } catch (error) {
    console.error(`getAllResourceRequests controller error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch a resource request by ID
const getResourceRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const resourceRequest = await resourceRequestService.getResourceRequestById(
      id
    );
    res.status(200).json({
      success: true,
      message: "Resource request fetched successfully",
      data: resourceRequest,
    });
  } catch (error) {
    console.error(`getResourceRequestById controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new resource request
const createResourceRequest = async (req, res) => {
  try {
    const { vendor_id, resource_name, resource_type_id, description, area_id } =
      req.body; // Extract area_id
    const resourceRequest = await resourceRequestService.createResourceRequest({
      vendor_id,
      resource_name,
      resource_type_id,
      description,
      area_id,
    });
    res.status(201).json({
      success: true,
      message: "Resource request created successfully",
      data: resourceRequest,
    });
  } catch (error) {
    console.error(`createResourceRequest controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a resource request
const updateResourceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource_name, resource_type_id, description, area_id } = req.body; // Extract area_id
    const resourceRequest = await resourceRequestService.updateResourceRequest(
      id,
      {
        resource_name,
        resource_type_id,
        description,
        area_id,
      }
    );
    res.status(200).json({
      success: true,
      message: "Resource request updated successfully",
      data: resourceRequest,
    });
  } catch (error) {
    console.error(`updateResourceRequest controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a resource request
const deleteResourceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await resourceRequestService.deleteResourceRequest(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(`deleteResourceRequest controller error: ${error}`);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve resource request
const approveResourceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResourceRequest =
      await resourceRequestService.approveResourceRequest(id);

    res.status(200).json({
      success: true,
      message: "Resource request approved successfully",
      data: updatedResourceRequest,
    });
  } catch (error) {
    console.error(`approveResourceRequest controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject a resource request
const rejectResourceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResourceRequest =
      await resourceRequestService.rejectResourceRequest(id);

    res.status(200).json({
      success: true,
      message: "Resource request rejected successfully",
      data: updatedResourceRequest,
    });
  } catch (error) {
    console.error(`rejectResourceRequest controller error: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
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
