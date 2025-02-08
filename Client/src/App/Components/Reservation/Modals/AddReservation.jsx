import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Loader } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { CreateReservationAPI } from "../../../API/Reservations/Reservation";
import { GetAllUsersAPI } from "../../../API/Users/User";
import { GetAllResourcesAPI } from "../../../API/Resources/Resource";

const AddReservation = ({ opened, onClose, onSuccess }) => {
  const [resourceId, setResourceId] = useState("");
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await GetAllUsersAPI();
        const resourcesResponse = await GetAllResourcesAPI();

        if (usersResponse?.success) {
          setUsers(
            usersResponse.data.map((user) => ({
              value: user.id,
              label: `${user.username} (${user.email})`,
            }))
          );
        }

        if (resourcesResponse?.success) {
          setResources(
            resourcesResponse.data.map((resource) => ({
              value: resource.id,
              label: `${resource.resource_name} - ${resource.Area.area_name}`,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (opened) {
      fetchData();
    }
  }, [opened]);

  const handleAddReservation = async () => {
    if (!resourceId || !userId || !startTime || !endTime) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      resource_id: resourceId,
      user_id: userId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };

    try {
      const response = await CreateReservationAPI(payload);
      if (response?.success) {
        onSuccess(); // Refresh reservation list
        onClose(); // Close the modal
        setResourceId("");
        setUserId("");
        setStartTime(null);
        setEndTime(null);
      } else {
        alert("Failed to add reservation");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the reservation");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Reservation">
      <Select
        label="Select Resource"
        placeholder="Choose a resource"
        data={resources}
        value={resourceId}
        onChange={setResourceId}
        required
        mb="md"
      />
      <Select
        label="Select User"
        placeholder="Choose a user"
        data={users}
        value={userId}
        onChange={setUserId}
        required
        mb="md"
      />
      <DatePickerInput
        label="Start Date"
        placeholder="Pick start date"
        value={startTime}
        onChange={setStartTime}
        required
        mb="md"
      />
      <DatePickerInput
        label="End Date"
        placeholder="Pick end date"
        value={endTime}
        onChange={setEndTime}
        required
        mb="md"
      />
      <Button onClick={handleAddReservation} loading={loading}>
        Add Reservation
      </Button>
    </Modal>
  );
};

export default AddReservation;
