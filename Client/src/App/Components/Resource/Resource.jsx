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
import { GetAllResourcesAPI } from "../../API/Resources/Resource";
import AddResource from "./Modals/AddResource";
import EditResource from "./Modals/EditResource";

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);

  const fetchResourcesAPICall = async () => {
    setLoading(true);
    try {
      const response = await GetAllResourcesAPI();
      if (response?.success) {
        setResources(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResourcesAPICall();
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.resource_name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    const updatedResources = resources.filter(
      (resource) => !selectedRows.includes(resource.id)
    );
    setResources(updatedResources);
    setSelectedRows([]);
  };

  const openAddResourceModal = () => {
    setAddModalOpen(true);
  };

  const openEditResourceModal = (resource) => {
    setResourceToEdit(resource);
    setEditModalOpen(true);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      <Title order={2} align="left" mb="md">
        Resource Management Page
      </Title>

      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search resources..."
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
              onClick={openAddResourceModal}
            >
              Add Resource
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
                    Resource Name
                  </Table.Th>
                  <Table.Th style={{ minWidth: "350px", textAlign: "center" }}>
                    Description
                  </Table.Th>
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    Resource Type
                  </Table.Th>
                  <Table.Th style={{ minWidth: "150px", textAlign: "center" }}>
                    Area
                  </Table.Th>
                  <Table.Th style={{ minWidth: "150px", textAlign: "center" }}>
                    Is Available
                  </Table.Th>
                  <Table.Th style={{ width: "80px", textAlign: "center" }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <Table.Tr
                      key={resource.id}
                      bg={
                        selectedRows.includes(resource.id)
                          ? "var(--mantine-color-blue-light)"
                          : undefined
                      }
                    >
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(resource.id)}
                          onChange={() => toggleRowSelection(resource.id)}
                        />
                      </Table.Td>
                      <Table.Td>{resource.resource_name}</Table.Td>
                      <Table.Td>{resource.description}</Table.Td>
                      <Table.Td>
                        {resource.Resource_Type.resource_type_name}
                      </Table.Td>
                      <Table.Td>{resource.Area.area_name}</Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        {resource.is_available ? "Yes" : "No"}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        <ActionIcon
                          color="blue"
                          onClick={() => openEditResourceModal(resource)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                      No resources found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      <AddResource
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={fetchResourcesAPICall}
      />

      {resourceToEdit && (
        <EditResource
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          resource={resourceToEdit}
          onSuccess={fetchResourcesAPICall}
        />
      )}
    </div>
  );
};

export default Resource;
