import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Textarea, Loader } from "@mantine/core";
import { EditTeamAPI } from "../../../API/Teams/Team"; // API call for editing team

const EditTeam = ({ opened, onClose, team, onSuccess }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Set form fields if the team prop is passed
  useEffect(() => {
    if (team) {
      setTeamName(team.team_name);
      setDescription(team.description);
    }
  }, [team]);

  const handleEditTeam = async () => {
    if (!teamName || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      team_name: teamName,
      description: description,
    };

    try {
      const response = await EditTeamAPI(payload, team.id);
      if (response?.success) {
        onSuccess(); // Refresh team list after editing
        onClose(); // Close the modal
      } else {
        alert("Failed to edit team");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing the team");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Team">
      <TextInput
        label="Team Name"
        placeholder="Enter team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter team description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="md"
      />
      <Button onClick={handleEditTeam} loading={loading}>
        Save Changes
      </Button>
    </Modal>
  );
};

export default EditTeam;
