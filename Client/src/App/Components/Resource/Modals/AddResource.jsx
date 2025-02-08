import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
  Loader,
} from "@mantine/core";
import { GetAllAreasAPI } from "../../../API/Areas/Area";
import { GetAllResourceTypesAPI } from "../../../API/Resource_Type/Resource_Type";
import { CreateResourceAPI } from "../../../API/Resources/Resource";

const AddResource = ({ opened, onClose, onSuccess }) => {
  const [areas, setAreas] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [resourceName, setResourceName] = useState("");
  const [description, setDescription] = useState("");
  const [areaId, setAreaId] = useState(null);
  const [resourceTypeId, setResourceTypeId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch areas and resource types
  const fetchData = async () => {
    try {
      const [areasResponse, resourceTypesResponse] = await Promise.all([
        GetAllAreasAPI(),
        GetAllResourceTypesAPI(),
      ]);

      if (areasResponse?.success) {
        setAreas(
          areasResponse.data.map((area) => ({
            value: area.id,
            label: area.area_name,
          }))
        );
      }

      if (resourceTypesResponse?.success) {
        setResourceTypes(
          resourceTypesResponse.data.map((type) => ({
            value: type.id,
            label: type.resource_type_name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddResource = async () => {
    if (!resourceName || !description || !areaId || !resourceTypeId) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      resource_name: resourceName,
      resource_type_id: resourceTypeId,
      area_id: areaId,
      description: description,
    };

    try {
      const response = await CreateResourceAPI(payload);
      if (response?.success) {
        onSuccess(); // Refresh resources list
        onClose(); // Close the modal
        setResourceName(""); // Reset fields
        setDescription("");
        setAreaId(null);
        setResourceTypeId(null);
      } else {
        alert("Failed to add resource");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the resource");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Resource">
      <TextInput
        label="Resource Name"
        placeholder="Enter resource name"
        value={resourceName}
        onChange={(e) => setResourceName(e.target.value)}
        required
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter resource description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="md"
      />
      <Select
        label="Select Area"
        placeholder="Choose an area"
        data={areas}
        value={areaId}
        onChange={setAreaId}
        required
        mb="md"
      />
      <Select
        label="Select Resource Type"
        placeholder="Choose a resource type"
        data={resourceTypes}
        value={resourceTypeId}
        onChange={setResourceTypeId}
        required
        mb="md"
      />
      <Button onClick={handleAddResource} loading={loading}>
        Add Resource
      </Button>
    </Modal>
  );
};

export default AddResource;
