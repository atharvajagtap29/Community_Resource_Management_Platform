import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Loader } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { EditReservationAPI } from "../../../API/Reservations/Reservation";
import { GetAllUsersAPI } from "../../../API/Users/User";
import { GetAllResourcesAPI } from "../../../API/Resources/Resource";

const EditReservation = ({ opened, onClose, reservation, onSuccess }) => {
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

    if (opened && reservation) {
      setResourceId(reservation.resource_id);
      setUserId(reservation.user_id);
      setStartTime(new Date(reservation.start_time));
      setEndTime(new Date(reservation.end_time));
      fetchData();
    }
  }, [opened, reservation]);

  const handleEditReservation = async () => {
    if (!resourceId || !userId || !startTime || !endTime) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      reservation_id: reservation.id,
      resource_id: resourceId,
      user_id: userId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    };

    try {
      const response = await EditReservationAPI(payload);
      if (response?.success) {
        onSuccess(); // Refresh reservation list
        onClose(); // Close the modal
      } else {
        alert("Failed to edit reservation");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing the reservation");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Reservation">
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
      <DateTimePicker
        label="Start Time"
        placeholder="Pick start time"
        value={startTime}
        onChange={setStartTime}
        required
        mb="md"
      />
      <DateTimePicker
        label="End Time"
        placeholder="Pick end time"
        value={endTime}
        onChange={setEndTime}
        required
        mb="md"
      />
      <Button onClick={handleEditReservation} loading={loading}>
        Edit Reservation
      </Button>
    </Modal>
  );
};

export default EditReservation;
