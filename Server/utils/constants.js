// APPLICATION USER ROLES
const USER_ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee", // Employees will also be created by admin user. [vendor & employee]
  END_USER: "end_user", // Self registration
  VENDOR: "vendor", // Vendor will assume is on subscription basis. Once subscribed, admin himself will add a vendor user.
};

// COMPLAINT STATUS
const COMPLAINT_STATUS = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
};

// UNIVERSAL STATUS
const STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
};

module.exports = {
  USER_ROLES,
  COMPLAINT_STATUS,
  STATUS,
};
