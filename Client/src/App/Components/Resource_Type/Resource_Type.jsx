import React, { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  TextInput,
  Group,
  Loader,
  ScrollArea,
  Title,
  Paper,
  Divider,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconSearch, IconTrash, IconPlus, IconEdit } from "@tabler/icons-react";
import { GetAllResourceTypesAPI } from "../../API/Resource_Type/Resource_Type";
import AddResourceType from "./Modals/AddResourceType";
import EditResourceType from "./Modals/EditResourceType";

const ResourceType = () => {
  const [resourceTypes, setResourceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  // Fetch resource types from API
  const fetchResourceTypes = async () => {
    setLoading(true);
    try {
      const response = await GetAllResourceTypesAPI();
      if (response?.success) {
        setResourceTypes(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResourceTypes();
  }, []);

  // Filter resource types based on search
  const filteredResourceTypes = resourceTypes.filter((resource) =>
    resource.resource_type_name.toLowerCase().includes(search.toLowerCase())
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
    const updatedResources = resourceTypes.filter(
      (resource) => !selectedRows.includes(resource.id)
    );
    setResourceTypes(updatedResources);
    setSelectedRows([]);
  };

  // Open AddResourceType modal
  const openAddResourceTypeModal = () => {
    setAddModalOpen(true);
  };

  // Open EditResourceType modal
  const openEditResourceTypeModal = (resource) => {
    setEditingResource(resource);
    setEditModalOpen(true);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      <Title order={2} align="left" mb="md">
        Resource Type Management
      </Title>

      <Paper shadow="xs" p="lg" radius="md" withBorder>
        {/* Search, Add, and Delete Buttons */}
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search resource types..."
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
              onClick={openAddResourceTypeModal}
            >
              Add Resource Type
            </Button>
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
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    Resource Type Name
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
                {filteredResourceTypes.length > 0 ? (
                  filteredResourceTypes.map((resource) => (
                    <Table.Tr key={resource.id}>
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(resource.id)}
                          onChange={() => toggleRowSelection(resource.id)}
                        />
                      </Table.Td>
                      <Table.Td>{resource.resource_type_name}</Table.Td>
                      <Table.Td>{resource.description}</Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        {new Date(resource.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        <ActionIcon
                          color="blue"
                          onClick={() => openEditResourceTypeModal(resource)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan="5" style={{ textAlign: "center" }}>
                      No resource types found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      {/* Add Resource Type Modal */}
      <AddResourceType
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={fetchResourceTypes}
      />

      {/* Edit Resource Type Modal */}
      {editingResource && (
        <EditResourceType
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          resource={editingResource}
          onSuccess={fetchResourceTypes}
        />
      )}
    </div>
  );
};

export default ResourceType;
