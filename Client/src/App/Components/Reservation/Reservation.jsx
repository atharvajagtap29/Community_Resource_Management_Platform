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
import { GetAllReservationsAPI } from "../../API/Reservations/Reservation";
import AddReservation from "./Modals/AddReservation";
import EditReservation from "./Modals/EditReservation";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [addReservationModalOpened, setAddReservationModalOpened] =
    useState(false);
  const [editReservationModalOpened, setEditReservationModalOpened] =
    useState(false);

  const fetchReservationsAPICall = async () => {
    setLoading(true);
    try {
      const response = await GetAllReservationsAPI();
      if (response?.success) {
        setReservations(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationsAPICall();
  }, []);

  const filteredReservations = reservations.filter((reservation) =>
    reservation.Resource?.resource_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    const updatedReservations = reservations.filter(
      (reservation) => !selectedRows.includes(reservation.id)
    );
    setReservations(updatedReservations);
    setSelectedRows([]);
  };

  const handleAddReservationSuccess = () => {
    fetchReservationsAPICall();
  };

  const handleEditButtonClick = (reservation) => {
    setSelectedReservation(reservation);
    setEditReservationModalOpened(true);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "auto" }}>
      <Title order={2} align="left" mb="md">
        Reservation Management Page
      </Title>
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Group>
            <TextInput
              placeholder="Search reservations..."
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
            <Button onClick={() => setAddReservationModalOpened(true)}>
              Add Reservation
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
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    User Name
                  </Table.Th>
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    Start Time
                  </Table.Th>
                  <Table.Th style={{ minWidth: "200px", textAlign: "center" }}>
                    End Time
                  </Table.Th>
                  <Table.Th style={{ width: "100px", textAlign: "center" }}>
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <Table.Tr
                      key={reservation.id}
                      bg={
                        selectedRows.includes(reservation.id)
                          ? "var(--mantine-color-blue-light)"
                          : undefined
                      }
                    >
                      <Table.Td style={{ textAlign: "center" }}>
                        <Checkbox
                          aria-label="Select row"
                          checked={selectedRows.includes(reservation.id)}
                          onChange={() => toggleRowSelection(reservation.id)}
                        />
                      </Table.Td>
                      <Table.Td>
                        {reservation.Resource?.resource_name || "N/A"}
                      </Table.Td>
                      <Table.Td>{reservation.User?.username || "N/A"}</Table.Td>

                      <Table.Td>
                        {new Date(reservation.start_time).toLocaleString()}
                      </Table.Td>
                      <Table.Td>
                        {new Date(reservation.end_time).toLocaleString()}
                      </Table.Td>
                      <Table.Td style={{ textAlign: "center" }}>
                        <ActionIcon
                          onClick={() => handleEditButtonClick(reservation)}
                          color="blue"
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                      No reservations found
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Paper>

      <AddReservation
        opened={addReservationModalOpened}
        onClose={() => setAddReservationModalOpened(false)}
        onSuccess={handleAddReservationSuccess}
      />
      <EditReservation
        opened={editReservationModalOpened}
        onClose={() => setEditReservationModalOpened(false)}
        reservation={selectedReservation}
        onSuccess={fetchReservationsAPICall}
      />
    </div>
  );
};

export default Reservation;
