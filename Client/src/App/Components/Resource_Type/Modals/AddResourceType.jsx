import { Modal, Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { CreateResourceTypeAPI } from "../../../API/Resource_Type/Resource_Type";

const AddResourceType = ({ opened, onClose, onSuccess }) => {
  const [resourceTypeName, setResourceTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddResourceType = async () => {
    if (!resourceTypeName || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      resource_type_name: resourceTypeName,
      description: description,
    };

    // console.log(`PAYLOAD >>>>> ${JSON.stringify(payload)}`);

    try {
      const response = await CreateResourceTypeAPI(payload);
      if (response?.success) {
        onSuccess();
        onClose();
        setResourceTypeName("");
        setDescription("");
      } else {
        alert("Failed to add resource type");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the resource type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Resource Type">
      <TextInput
        label="Resource Type Name"
        placeholder="Enter resource type name"
        value={resourceTypeName}
        onChange={(e) => setResourceTypeName(e.target.value)}
        required
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter resource type description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="md"
      />
      <Button onClick={handleAddResourceType} loading={loading}>
        Add Resource Type
      </Button>
    </Modal>
  );
};

export default AddResourceType;
