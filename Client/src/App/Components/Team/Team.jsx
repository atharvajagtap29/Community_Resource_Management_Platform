import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  Button,
  TextInput,
  ActionIcon,
  Group,
  Loader,
  ScrollArea,
  Title,
  Paper,
  Divider,
} from "@mantine/core";
import { IconSearch, IconTrash, IconEdit } from "@tabler/icons-react";
import { GetAllTeamsAPI } from "../../API/Teams/Team";
import AddTeam from "./Modals/AddTeam";
import EditTeam from "./Modals/EditTeam";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // State to hold the selected team
  const [addTeamModalOpened, setAddTeamModalOpened] = useState(false);
  const [editTeamModalOpened, setEditTeamModalOpened] = useState(false);

  const fetchTeamsAPICall = async () => {
    setLoading(true);
    try {
      const response = await GetAllTeamsAPI();
      if (response?.success) {
        setTeams(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsAPICall();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    const updatedTeams = teams.filter(
      (team) => !selectedRows.includes(team.id)
    );
    setTeams(updatedTeams);
    setSelectedRows([]);
  };

  const handleAddTeamSuccess = () => {
    fetchTeamsAPICall(); // Refresh the team list after adding a new team
  };

  const handleEditButtonClick = (team) => {
    setSelectedTeam(team); // Set the selected team for editing
    setEditTeamModalOpened(true); // Open the edit team modal
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      <Title order={2} align="left" mb="md">
        Team Management Page
      </Title>
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IconSearch size={16} />}
              w={250}
            />
            <Button leftIcon={<IconSearch size={16} />}>Search</Button>
          </Group>
          <Group>
            {selectedRows.length > 0 && (
              <Button
                leftIcon={<IconTrash size={16} />}
                color="red"
                onClick={handleDelete}
              >
                Delete Selected
              </Button>
            )}
            <Button onClick={() => setAddTeamModalOpened(true)}>
              Add Team
            </Button>
          </Group>
        </Group>

        <Divider mb="md" />

        <ScrollArea>
          {loading ? (
            <Loader />
          ) : (
            <Table striped highlightOnHover withBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th
                    style={{ width: "50px", textAlign: "center" }}
                  ></Table.Th>
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    Team Name
                  </Table.Th>
                  <Table.Th style={{ minWidth: "350px", textAlign: "center" }}>
                    Description
                  </Table.Th>
                  <Table.Th style={{ minWidth: "150px", textAlign: "center" }}>
                    Created At
                  </Table.Th>
                  <Table.Th style={{ width: "100px", textAlign: "center" }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <Table.Tr
                      key={team.id}
                      bg={
                        selectedRows.includes(team.id)
                          ? "var(--mantine-color-blue-light)"
                          : undefined
                      }
                    >
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(team.id)}
                          onChange={() => toggleRowSelection(team.id)}
                        />
                      </Table.Td>
                      <Table.Td>{team.team_name}</Table.Td>
                      <Table.Td>{team.description}</Table.Td>
                      <Table.Td>
                        {new Date(team.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        <ActionIcon
                          onClick={() => handleEditButtonClick(team)}
                          color="blue"
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                      No teams found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>
      <AddTeam
        opened={addTeamModalOpened}
        onClose={() => setAddTeamModalOpened(false)}
        onSuccess={handleAddTeamSuccess}
      />
      <EditTeam
        opened={editTeamModalOpened}
        onClose={() => setEditTeamModalOpened(false)}
        team={selectedTeam} // Pass the selected team to edit
        onSuccess={fetchTeamsAPICall} // Refresh team list after success
      />
    </div>
  );
};

export default Team;
