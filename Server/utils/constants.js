// APPLICATION USER ROLES
const USER_ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  END_USER: "end_user",
  GUEST: "guest",
};

// COMPLAINT STATUS
const COMPLAINT_STATUS = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
};

// RESERVATION STATUS
const RESERVATION_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
};

module.exports = {
  USER_ROLES,
  COMPLAINT_STATUS,
  RESERVATION_STATUS,
};
