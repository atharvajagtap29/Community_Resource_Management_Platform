import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL COMPLAINTS
export const GetAllComplaintsAPI = async () => {
  try {
    const response = await axiosInstance.get(
      BACKEND_API_ENDPOINTS.COMPLAINT.READ
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

// CREATE A NEW COMPLAINT
export const CreateComplaintAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.COMPLAINT.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating complaint:", error);
    throw error;
  }
};

// EDIT A COMPLAINT
export const EditComplaintAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.COMPLAINT.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing complaint:", error);
    throw error;
  }
};

// DELETE A COMPLAINT
export const DeleteComplaintAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${BACKEND_API_ENDPOINTS.COMPLAINT.DELETE}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting complaint:", error);
    throw error;
  }
};
