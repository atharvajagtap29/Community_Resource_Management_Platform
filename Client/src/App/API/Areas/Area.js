import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL AREAS
export const GetAllAreasAPI = async () => {
  try {
    const response = await axiosInstance.get(BACKEND_API_ENDPOINTS.AREA.READ);
    return response.data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};

// CREATE A NEW AREA
export const CreateAreaAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.AREA.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating area:", error);
    throw error;
  }
};
// EDIT AN AREA
export const EditAreaAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.AREA.CREATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing area:", error);
    throw error;
  }
};
