import React, { useEffect, useState } from "react";
import { Modal, TextInput, Textarea, Button, Group } from "@mantine/core";
import { EditResourceTypeAPI } from "../../../API/Resource_Type/Resource_Type";

const EditResourceType = ({ opened, onClose, resourceType, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resourceType) {
      setName(resourceType.resource_type_name);
      setDescription(resourceType.description);
    }
  }, [resourceType]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await EditResourceTypeAPI(resourceType.id, {
        resource_type_name: name,
        description,
      });
      if (response?.success) {
        onSuccess(); // Refresh data
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Failed to update resource type", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Resource Type"
      centered
    >
      <TextInput
        label="Resource Type Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        mb="sm"
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="sm"
      />
      <Group position="right">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit} loading={loading}>
          Save Changes
        </Button>
      </Group>
    </Modal>
  );
};

export default EditResourceType;
