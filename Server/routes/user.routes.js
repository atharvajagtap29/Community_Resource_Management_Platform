const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const hashPasswordMiddleware = require("../middlewares/hash_pass.middleware");
const comparePasswordMiddleware = require("../middlewares/compare_pass.middleware");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Auth route
router.post("/", hashPasswordMiddleware, userController.createUser);
router.post("/login", comparePasswordMiddleware, userController.signInUser);

// Define routes
router.get("/", verifyRole([USER_ROLES.ADMIN]), userController.getAllUsers);
router.get("/:id", verifyRole([USER_ROLES.ADMIN]), userController.getUserById);
router.put(
  "/:id",
  verifyRole([
    USER_ROLES.ADMIN,
    USER_ROLES.EMPLOYEE,
    USER_ROLES.END_USER,
    USER_ROLES.VENDOR,
  ]),
  userController.updateUser
);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  userController.deleteUser
);

// Employee routes
router.get(
  "/employee/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  userController.getTeamDetails
);
router.get(
  "/employee/complaints/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  userController.getAssignedComplaints
);
router.put(
  "/employee/complaints/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  userController.updateComplaintStatus
);

module.exports = router;
