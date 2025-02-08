import React, { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Select,
  Button,
  Group,
  Loader,
  Textarea,
} from "@mantine/core";
import { GetAllAreasAPI } from "../../../API/Areas/Area";
import { GetAllTeamsAPI } from "../../../API/Teams/Team";
import { CreateUserAPI } from "../../../API/Users/User";

// User roles options
const USER_ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  END_USER: "end_user",
  VENDOR: "vendor",
};

const AddUser = ({ opened, onClose, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [area, setArea] = useState(null);
  const [team, setTeam] = useState(null);

  const [areas, setAreas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

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

  useEffect(() => {
    fetchAreas();
    fetchTeams();
  }, []);

  const handleSubmit = async () => {
    // Construct the user object
    const payload = {
      username,
      email,
      password,
      role,
      area_id: area,
      team_id: team,
    };

    try {
      console.log(`REQ PAYLOAD >>>> ${JSON.stringify(payload)}`);
      // Call the CreateUserAPI to create a new user
      const response = await CreateUserAPI(payload);

      if (response?.success) {
        // On successful user creation, call the onSuccess function
        onSuccess(payload);
        onClose(); // Close the modal
      } else {
        // Handle API failure (optional: show a message to the user)
        console.error("User creation failed:", response?.message);
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error creating user:", error);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add User" centered>
      <div>
        <TextInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Select
          label="Role"
          placeholder="Select role"
          data={[
            { value: USER_ROLES.ADMIN, label: "Admin" },
            { value: USER_ROLES.EMPLOYEE, label: "Employee" },
            { value: USER_ROLES.END_USER, label: "End User" },
            { value: USER_ROLES.VENDOR, label: "Vendor" },
          ]}
          value={role}
          onChange={setRole}
          required
        />
        <Select
          label="Area"
          placeholder="Select area"
          data={areas}
          value={area}
          onChange={setArea}
          loading={loadingAreas}
        />
        <Select
          label="Team"
          placeholder="Select team"
          data={teams}
          value={team}
          onChange={setTeam}
          loading={loadingTeams}
        />

        <Group position="right" mt="md">
          <Button
            onClick={handleSubmit}
            disabled={!username || !email || !password || !role}
          >
            Add User
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

export default AddUser;
