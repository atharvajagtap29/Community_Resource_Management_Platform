import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Loader } from "@mantine/core";
import { EditAreaAPI } from "../../../API/Areas/Area";

const EditArea = ({ opened, onClose, area, onSuccess }) => {
  const [areaName, setAreaName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (area) {
      setAreaName(area.area_name);
      setDescription(area.description);
    }
  }, [area]);

  const handleEdit = async () => {
    if (!areaName || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      area_name: areaName,
      description,
    };

    try {
      const response = await EditAreaAPI(payload, area.id); // Use the Edit API
      if (response?.success) {
        onSuccess(); // Trigger onSuccess callback
        onClose(); // Close the modal
      } else {
        alert("Failed to edit area");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing the area");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Area">
      <TextInput
        label="Area Name"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
        required
      />
      <TextInput
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button
        color="blue"
        fullWidth
        onClick={handleEdit}
        loading={loading}
        mt="md"
      >
        Edit Area
      </Button>
    </Modal>
  );
};

export default EditArea;
