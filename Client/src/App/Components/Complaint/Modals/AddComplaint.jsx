import React, { useState, useEffect } from "react";
import { Modal, Button, Textarea, Select, Loader } from "@mantine/core";
import { CreateComplaintAPI } from "../../../API/Complaints/Complaint";
import { GetAllResourcesAPI } from "../../../API/Resources/Resource";
import { GetAllUsersAPI } from "../../../API/Users/User";

const AddComplaint = ({ opened, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [userId, setUserId] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users and resources
  const fetchData = async () => {
    try {
      const [usersResponse, resourcesResponse] = await Promise.all([
        GetAllUsersAPI(),
        GetAllResourcesAPI(),
      ]);

      if (usersResponse?.success) {
        setUsers(
          usersResponse.data.map((user) => ({
            value: user.id,
            label: user.username,
          }))
        );
      }

      if (resourcesResponse?.success) {
        setResources(
          resourcesResponse.data.map((resource) => ({
            value: resource.id,
            label: resource.resource_name,
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

  const handleAddComplaint = async () => {
    if (!userId || !resourceId || !description) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      user_id: userId,
      resource_id: resourceId,
      description: description,
    };

    try {
      const response = await CreateComplaintAPI(payload);
      if (response?.success) {
        onSuccess(); // Refresh complaints list
        onClose(); // Close the modal
        setUserId(null);
        setResourceId(null);
        setDescription("");
      } else {
        alert("Failed to add complaint");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the complaint");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Complaint">
      <Select
        label="Select User"
        placeholder="Choose a user"
        data={users}
        value={userId}
        onChange={setUserId}
        required
        mb="md"
      />
      <Select
        label="Select Resource"
        placeholder="Choose a resource"
        data={resources}
        value={resourceId}
        onChange={setResourceId}
        required
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter complaint details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        mb="md"
      />
      <Button onClick={handleAddComplaint} loading={loading}>
        Add Complaint
      </Button>
    </Modal>
  );
};

export default AddComplaint;
