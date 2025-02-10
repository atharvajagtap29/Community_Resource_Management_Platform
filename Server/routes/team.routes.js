const express = require("express");
const router = express.Router();
const teamController = require("../controller/team.controller");
const verifyRole = require("../middlewares/verify_role.middleware");
const { USER_ROLES } = require("../utils/constants");

// Define routes
router.get(
  "/",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  teamController.getAllTeams
);
router.get(
  "/:id",
  verifyRole([USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE]),
  teamController.getTeamById
);
router.post("/", verifyRole([USER_ROLES.ADMIN]), teamController.createTeam);
router.put("/:id", verifyRole([USER_ROLES.ADMIN]), teamController.updateTeam);
router.delete(
  "/:id",
  verifyRole([USER_ROLES.ADMIN]),
  teamController.deleteTeam
);

module.exports = router;
