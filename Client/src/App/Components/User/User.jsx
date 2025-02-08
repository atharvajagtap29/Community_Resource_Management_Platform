import React, { useEffect, useState } from "react";
import {
  Table,
  Loader,
  TextInput,
  Group,
  Button,
  Paper,
  Divider,
  ScrollArea,
  Title,
  Checkbox,
} from "@mantine/core";
import { IconEdit, IconSearch } from "@tabler/icons-react";
import { GetAllUsersAPI } from "../../API/Users/User";
import AddUser from "./Modals/AddUser"; // Import the AddUser modal
import EditUser from "./Modals/EditUser"; // Import the EditUser modal

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [addUserModalOpened, setAddUserModalOpened] = useState(false); // Modal state for AddUser
  const [editUserModalOpened, setEditUserModalOpened] = useState(false); // Modal state for EditUser
  const [selectedUser, setSelectedUser] = useState([]); // Store the selected user for editing

  // Fetch users API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await GetAllUsersAPI();
      if (response?.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRowSelection = (id) => {
    setSelectedUser((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUserSuccess = (newUser) => {
    fetchUsers(); // Refresh the users list after a new user is added
  };

  const handleEditUserSuccess = () => {
    fetchUsers(); // Refresh the users list after a user is edited
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user); // Set the user to be edited
    setEditUserModalOpened(true); // Open the edit modal
  };

  const handleDelete = () => {
    const updatedReservations = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedReservations);
    setSelectedUser([]);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      <Title order={2} align="left" mb="md">
        User Management
      </Title>
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IconSearch size={16} />}
              w={250}
            />
            <Button leftIcon={<IconSearch size={16} />}>Search</Button>
            {selectedUser.length > 0 && (
              <Button
                leftIcon={<IconTrash size={16} />}
                color="red"
                onClick={handleDelete}
              >
                Delete Selected
              </Button>
            )}
          </Group>
          <Button onClick={() => setAddUserModalOpened(true)}>Add User</Button>
        </Group>

        <Divider mb="md" />

        <ScrollArea>
          {loading ? (
            <Loader />
          ) : (
            <Table striped highlightOnHover withBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Username</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Area</Table.Th>
                  <Table.Th>Team</Table.Th>
                  <Table.Th>Created At</Table.Th>
                  <Table.Th>Actions</Table.Th> {/* Add actions column */}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedUser.includes(user?.id)}
                          onChange={() => toggleRowSelection(user.id)}
                        />
                      </Table.Td>
                      <Table.Td>{user.username}</Table.Td>
                      <Table.Td>{user.email}</Table.Td>
                      <Table.Td>{user.role}</Table.Td>
                      <Table.Td>
                        {user.Area ? user.Area.area_name : "N/A"}
                      </Table.Td>
                      <Table.Td>
                        {user.Team ? user.Team.team_name : "N/A"}
                      </Table.Td>
                      <Table.Td>
                        {new Date(user.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        <Button onClick={() => openEditUserModal(user)}>
                          <IconEdit size={16} />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                      No users found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      {/* AddUser Modal */}
      <AddUser
        opened={addUserModalOpened}
        onClose={() => setAddUserModalOpened(false)}
        onSuccess={handleAddUserSuccess}
      />

      {/* EditUser Modal */}
      <EditUser
        opened={editUserModalOpened}
        onClose={() => setEditUserModalOpened(false)}
        onSuccess={handleEditUserSuccess}
        user={selectedUser}
      />
    </div>
  );
};

export default User;
