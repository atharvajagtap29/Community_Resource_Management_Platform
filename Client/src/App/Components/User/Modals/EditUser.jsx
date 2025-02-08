import React, { useState, useEffect } from "react";
import { Modal, TextInput, Select, Button, Group, Loader } from "@mantine/core";
import { EditUserAPI } from "../../../API/Users/User";
import { GetAllAreasAPI } from "../../../API/Areas/Area";
import { GetAllTeamsAPI } from "../../../API/Teams/Team";

// User roles options
const USER_ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  END_USER: "end_user",
  VENDOR: "vendor",
};

const EditUser = ({ opened, onClose, user, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [area, setArea] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  const [areas, setAreas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

  // Fetch Areas
  const fetchAreas = async () => {
    setLoadingAreas(true);
    try {
      const response = await GetAllAreasAPI();
      if (response?.success) {
        setAreas(
          response.data.map((area) => ({
            value: area.id,
            label: area.area_name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setLoadingAreas(false);
    }
  };

  // Fetch Teams
  const fetchTeams = async () => {
    setLoadingTeams(true);
    try {
      const response = await GetAllTeamsAPI();
      if (response?.success) {
        setTeams(
          response.data.map((team) => ({
            value: team.id,
            label: team.team_name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoadingTeams(false);
    }
  };

  // Load user data and fetch areas and teams on open
  useEffect(() => {
    console.log(`${JSON.stringify(user)} >>>>>>> `);
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setArea(user.area_id || null);
      setTeam(user.team_id || null);
    }
    fetchAreas();
    fetchTeams();
  }, [user]);

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    const updatedData = {
      username,
      email,
      role,
      area_id: area,
      team_id: team,
    };

    try {
      console.log(
        `PARAMS >>>>> ${JSON.stringify(user.id)} &&&& ${JSON.stringify(
          updatedData
        )}`
      );
      const response = await EditUserAPI(updatedData, user.id);
      if (response?.success) {
        onSuccess(); // Refresh the users list
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error editing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Select
            label="Role"
            value={role}
            onChange={setRole}
            data={[
              { value: USER_ROLES.ADMIN, label: "Admin" },
              { value: USER_ROLES.EMPLOYEE, label: "Employee" },
              { value: USER_ROLES.END_USER, label: "End User" },
              { value: USER_ROLES.VENDOR, label: "Vendor" },
            ]}
            required
          />
          <Select
            label="Area"
            placeholder="Select area"
            value={area}
            onChange={setArea}
            data={areas}
            loading={loadingAreas}
          />
          <Select
            label="Team"
            placeholder="Select team"
            value={team}
            onChange={setTeam}
            data={teams}
            loading={loadingTeams}
          />
          <Group position="right" mt="md">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </Group>
        </div>
      )}
    </Modal>
  );
};

export default EditUser;
