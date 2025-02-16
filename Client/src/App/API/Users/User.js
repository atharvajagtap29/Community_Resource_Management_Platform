import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// LOGIN USER
export const loginUserAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.USER.LOGIN,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// SIGNOUT USER
export const signOutUserAPI = async () => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.USER.LOGOUT
    );
    return response.data;
  } catch (error) {
    console.error("Error signing out user:", error);
    throw error;
  }
};

// AUTH CHECK
export const isAuthenticatedAPI = async () => {
  try {
    const response = await axiosInstance.get(BACKEND_API_ENDPOINTS.USER.CHECK, {
      withCredentials: true,
    });
    return response.data.success; // true if authenticated, false otherwise
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false; // Assume not authenticated if API call fails
  }
};

// LOGOUT USER
export const logoutUserAPI = async () => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.USER.LOGOUT
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

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
