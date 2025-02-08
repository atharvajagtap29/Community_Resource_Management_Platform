import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL USERS
export const GetAllUsersAPI = async () => {
  try {
    const response = await axiosInstance.get(BACKEND_API_ENDPOINTS.USER.READ);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// CREATE A NEW USER
export const CreateUserAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.USER.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// EDIT A USER
export const EditUserAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.USER.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};
