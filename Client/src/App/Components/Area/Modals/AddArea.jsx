import { Modal, Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { CreateAreaAPI } from "../../../API/Areas/Area";

const AddArea = ({ opened, onClose, onSuccess }) => {
  const [areaName, setAreaName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddArea = async () => {
    if (!areaName || !description) {
      // Validation for empty fields
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      area_name: areaName,
      description: description,
    };

    console.log(`PAYLOAD >>>>> ${JSON.stringify(payload)}`);

    try {
      const response = await CreateAreaAPI(payload);
      if (response?.success) {
        onSuccess(); // Trigger the onSuccess callback to refresh the data
        onClose(); // Close the modal
        setAreaName(""); // Reset form fields
        setDescription("");
      } else {
        alert("Failed to add area");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the area");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Area">
      <TextInput
        label="Area Name"
        placeholder="Enter area name"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
        required
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter area description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="md"
      />
      <Button onClick={handleAddArea} loading={loading}>
        Add Area
      </Button>
    </Modal>
  );
};

export default AddArea;
