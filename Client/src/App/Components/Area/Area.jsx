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
import { GetAllAreasAPI } from "../../API/Areas/Area";
import AddArea from "./Modals/AddArea";
import EditArea from "./Modals/EditArea";

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [areaToEdit, setAreaToEdit] = useState(null);

  // Fetch areas from API
  const fetchAreasAPICall = async () => {
    setLoading(true);
    try {
      const response = await GetAllAreasAPI();
      if (response?.success) {
        setAreas(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreasAPICall();
  }, []);

  // Filtered areas based on search
  const filteredAreas = areas.filter((area) =>
    area.area_name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle delete action
  const handleDelete = () => {
    const updatedAreas = areas.filter(
      (area) => !selectedRows.includes(area.id)
    );
    setAreas(updatedAreas);
    setSelectedRows([]);
  };

  // Open AddArea modal
  const openAddAreaModal = () => {
    setAddModalOpen(true);
  };

  // Open EditArea modal with area data
  const openEditAreaModal = (area) => {
    setAreaToEdit(area);
    setEditModalOpen(true);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      {/* Page Heading */}
      <Title order={2} align="left" mb="md">
        Area Management Page
      </Title>

      <Paper shadow="xs" p="lg" radius="md" withBorder>
        {/* Search, Add, and Delete Buttons */}
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search areas..."
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
            <Button
              leftIcon={<IconPlus size={16} />}
              color="blue"
              onClick={openAddAreaModal}
            >
              Add Area
            </Button>
          </Group>
        </Group>

        <Divider mb="md" />

        {/* Table inside a scrollable container for responsiveness */}
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
                    Area Name
                  </Table.Th>
                  <Table.Th style={{ minWidth: "350px", textAlign: "center" }}>
                    Description
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
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => (
                    <Table.Tr
                      key={area.id}
                      bg={
                        selectedRows.includes(area.id)
                          ? "var(--mantine-color-blue-light)"
                          : undefined
                      }
                    >
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(area.id)}
                          onChange={() => toggleRowSelection(area.id)}
                        />
                      </Table.Td>
                      <Table.Td>{area.area_name}</Table.Td>
                      <Table.Td>{area.description}</Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        {new Date(area.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td
                        style={{ textAlign: "center" }}
                        onClick={() => openEditAreaModal(area)}
                      >
                        <ActionIcon color="blue">
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan="5" style={{ textAlign: "center" }}>
                      No areas found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      {/* Modals for Adding and Editing */}
      <AddArea
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => fetchAreasAPICall()} // The API needs to be called again to load the refreshed data after adding
      />
      <EditArea
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        area={areaToEdit}
        onSuccess={() => fetchAreasAPICall()} // The API needs to be called again to load the refreshed data after editing
      />
    </div>
  );
};

export default Area;
