import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL RESOURCE
export const GetAllResourcesAPI = async () => {
  try {
    const response = await axiosInstance.get(
      BACKEND_API_ENDPOINTS.RESOURCE.READ
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

// CREATE A NEW RESOURCE
export const CreateResourceAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.RESOURCE.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};

// EDIT A RESOURCE
export const EditResourceAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.RESOURCE.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing resource:", error);
    throw error;
  }
};
