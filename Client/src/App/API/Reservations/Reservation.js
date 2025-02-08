import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL RESERVATIONS
export const GetAllReservationsAPI = async () => {
  try {
    const response = await axiosInstance.get(
      BACKEND_API_ENDPOINTS.RESERVATION.READ
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

// CREATE A NEW RESERVATION
export const CreateReservationAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.RESERVATION.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

// EDIT A RESERVATION
export const EditReservationAPI = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.RESERVATION.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing reservation:", error);
    throw error;
  }
};

// DELETE A RESERVATION
export const DeleteReservationAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${BACKEND_API_ENDPOINTS.RESERVATION.DELETE}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};
