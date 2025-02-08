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
import { EditResourceAPI } from "../../../API/Resources/Resource";

const EditResource = ({ opened, onClose, resource, onSuccess }) => {
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

      if (areasResponse.success) {
        setAreas(
          areasResponse.data.map((area) => ({
            value: area.id,
            label: area.area_name,
          }))
        );
      }

      if (resourceTypesResponse.success) {
        setResourceTypes(
          resourceTypesResponse.data.map((type) => ({
            value: type.id,
            label: type.resource_type_name,
          }))
        );
      }

      if (resource) {
        setResourceName(resource.resource_name);
        setDescription(resource.description);
        setAreaId(resource.area_id);
        setResourceTypeId(resource.resource_type_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]); // Function is called on resource state updates because, to ensure that the form fields in the EditResource modal are updated whenever the resource object changes.

  const handleEditResource = async () => {
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
      const response = await EditResourceAPI(payload, resource.id);
      if (response?.success) {
        onSuccess(); // Refresh resources list
        onClose(); // Close the modal
      } else {
        alert("Failed to edit resource");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing the resource");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Resource">
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
      <Button onClick={handleEditResource} loading={loading}>
        Save Changes
      </Button>
    </Modal>
  );
};

export default EditResource;
