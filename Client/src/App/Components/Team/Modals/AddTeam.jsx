import React, { useState } from "react";
import { Modal, Button, TextInput, Textarea, Loader } from "@mantine/core";
import { CreateTeamAPI } from "../../../API/Teams/Team";

const AddTeam = ({ opened, onClose, onSuccess }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTeam = async () => {
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
      const response = await CreateTeamAPI(payload);
      if (response?.success) {
        onSuccess(); // Refresh team list
        onClose(); // Close the modal
        setTeamName(""); // Reset fields
        setDescription("");
      } else {
        alert("Failed to add team");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the team");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Team">
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
      <Button onClick={handleAddTeam} loading={loading}>
        Add Team
      </Button>
    </Modal>
  );
};

export default AddTeam;
