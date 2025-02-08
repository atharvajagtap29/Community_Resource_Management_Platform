import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Loader } from "@mantine/core";
import { EditComplaintAPI } from "../../../API/Complaints/Complaint";
import { GetAllTeamsAPI } from "../../../API/Teams/Team";

const EditComplaint = ({ opened, onClose, complaintId, onSuccess }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await GetAllTeamsAPI();
        if (response?.success) {
          setTeams(
            response.data.map((team) => ({
              value: team.id,
              label: team.team_name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    if (opened) fetchTeams();
  }, [opened]);

  // Handle complaint update
  const handleEditComplaint = async () => {
    if (!selectedTeam) {
      alert("Please select a team");
      return;
    }

    setLoading(true);
    try {
      const response = await EditComplaintAPI(complaintId, {
        team_id: selectedTeam,
      });

      if (response?.success) {
        onSuccess();
        onClose();
      } else {
        alert("Failed to update complaint");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("An error occurred while updating the complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Assign Complaint to Team">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Select
            label="Select Team"
            placeholder="Choose a team"
            data={teams}
            value={selectedTeam}
            onChange={setSelectedTeam}
            required
            mb="md"
          />
          <Button onClick={handleEditComplaint} loading={loading}>
            Assign Complaint
          </Button>
        </>
      )}
    </Modal>
  );
};

export default EditComplaint;
