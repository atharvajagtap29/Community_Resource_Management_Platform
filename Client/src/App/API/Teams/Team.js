import axiosInstance from "../../Config/axiosConfig";
import { BACKEND_API_ENDPOINTS } from "../../Helpers/endpoints.json";

// GET ALL TEAMS
export const GetAllTeamsAPI = async () => {
  try {
    const response = await axiosInstance.get(BACKEND_API_ENDPOINTS.TEAM.READ);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

// CREATE A NEW TEAM
export const CreateTeamAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      BACKEND_API_ENDPOINTS.TEAM.CREATE,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

// EDIT A TEAM
export const EditTeamAPI = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API_ENDPOINTS.TEAM.UPDATE}/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error editing team:", error);
    throw error;
  }
};
