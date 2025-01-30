import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL RESOURCE TYPES
export const GetAllResourceTypesAPI = async () => {
  try {
    const response = await axiosInstance.get(
      BACKEND_API_ENDPOINTS.RESOURCE_TYPE.READ
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resource types:", error);
    throw error;
  }
};

// CREATE A NEW AREA
export const CreateResourceTypeAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.RESOURCE_TYPE.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource type:", error);
    throw error;
  }
};
// EDIT AN AREA
export const EditResourceTypeAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.RESOURCE_TYPE.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing resource type:", error);
    throw error;
  }
};
