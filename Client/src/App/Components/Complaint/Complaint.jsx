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
import { IconSearch, IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { GetAllComplaintsAPI } from "../../API/Complaints/Complaint";
import AddComplaint from "./Modals/AddComplaint";
import EditComplaint from "./Modals/EditComplaint";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [addModalOpened, setAddModalOpen] = useState(false);
  const [editModalOpened, setEditModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints from API
  const fetchComplaintsAPICall = async () => {
    setLoading(true);
    try {
      const response = await GetAllComplaintsAPI();
      if (response?.success) {
        setComplaints(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintsAPICall();
  }, []);

  // Filter complaints based on search
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.description.toLowerCase().includes(search.toLowerCase())
  );

  // Handle row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle delete action (Mock deletion for UI only)
  const handleDelete = () => {
    const updatedComplaints = complaints.filter(
      (complaint) => !selectedRows.includes(complaint.id)
    );
    setComplaints(updatedComplaints);
    setSelectedRows([]);
  };

  // Handle edit modal open
  const handleEditClick = (complaint) => {
    setSelectedComplaint(complaint);
    setEditModalOpen(true);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      {/* Page Heading */}
      <Title order={2} align="left" mb="md">
        Complaint Management Page
      </Title>

      <Paper shadow="xs" p="lg" radius="md" withBorder>
        {/* Search, Add, and Delete Buttons */}
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IconSearch size={16} />}
              w={250}
            />
            <Button leftIcon={<IconSearch size={16} />}>Search</Button>
          </Group>
          <Group>
            <Button
              leftIcon={<IconPlus size={16} />}
              onClick={() => setAddModalOpen(true)}
            >
              Add Complaint
            </Button>
            {selectedRows.length > 0 && (
              <Button
                leftIcon={<IconTrash size={16} />}
                color="red"
                onClick={handleDelete}
              >
                Delete Selected
              </Button>
            )}
          </Group>
        </Group>

        <Divider mb="md" />

        {/* Table inside a scrollable container */}
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
                  <Table.Th style={{ minWidth: "150px", textAlign: "center" }}>
                    User
                  </Table.Th>
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    Resource
                  </Table.Th>
                  <Table.Th style={{ minWidth: "350px", textAlign: "center" }}>
                    Description
                  </Table.Th>
                  <Table.Th style={{ minWidth: "150px", textAlign: "center" }}>
                    Status
                  </Table.Th>
                  <Table.Th style={{ width: "180px", textAlign: "center" }}>
                    Created At
                  </Table.Th>
                  <Table.Th style={{ width: "80px", textAlign: "center" }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <Table.Tr
                      key={complaint.id}
                      bg={
                        selectedRows.includes(complaint.id)
                          ? "var(--mantine-color-blue-light)"
                          : undefined
                      }
                    >
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(complaint.id)}
                          onChange={() => toggleRowSelection(complaint.id)}
                        />
                      </Table.Td>
                      <Table.Td>
                        {complaint.User.username} ({complaint.User.email})
                      </Table.Td>
                      <Table.Td>{complaint.Resource.resource_name}</Table.Td>
                      <Table.Td>{complaint.description}</Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        {complaint.complaint_status}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        {new Date(complaint.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        <ActionIcon
                          color="blue"
                          onClick={() => handleEditClick(complaint)}
                          disabled={complaint.complaint_status === "RESOLVED"}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan="7" style={{ textAlign: "center" }}>
                      No complaints found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      {/* Add Complaint Modal */}
      <AddComplaint
        opened={addModalOpened}
        onClose={() => setAddModalOpen(false)}
        onSuccess={fetchComplaintsAPICall} // Refresh complaints after adding
      />

      {/* Edit Complaint Modal */}
      <EditComplaint
        opened={editModalOpened}
        onClose={() => setEditModalOpen(false)}
        complaint={selectedComplaint}
        onSuccess={fetchComplaintsAPICall} // Refresh complaints after editing
      />
    </div>
  );
};

export default Complaint;
