const User = require("./user");
const Area = require("./area");
const Resource_Type = require("./resource_type");
const Resource = require("./resource");
const Reservation = require("./reservation");
const Complaint = require("./compaint");
const Team = require("./team");

// Define associations between models

// One-to-many relationship between Area and User (One Area has many Users)
Area.hasMany(User, { foreignKey: "area_id" });
User.belongsTo(Area, { foreignKey: "area_id" });

// One-to-many relationship between Resource_Type and Resource (One Resource_Type has many Resources)
Resource_Type.hasMany(Resource, { foreignKey: "resource_type_id" });
Resource.belongsTo(Resource_Type, { foreignKey: "resource_type_id" });

// One-to-many relationship between Area and Resource (One Area has many Resources)
Area.hasMany(Resource, { foreignKey: "area_id" });
Resource.belongsTo(Area, { foreignKey: "area_id" });

// One-to-many relationship between User and Reservation (One User has many Reservations)
User.hasMany(Reservation, { foreignKey: "user_id" });
Reservation.belongsTo(User, { foreignKey: "user_id" });

// One-to-many relationship between Resource and Reservation (One Resource has many Reservations)
Resource.hasMany(Reservation, { foreignKey: "resource_id" });
Reservation.belongsTo(Resource, { foreignKey: "resource_id" });

// One-to-many relationship between User and Complaint (One User has many Complaints)
User.hasMany(Complaint, { foreignKey: "user_id" });
Complaint.belongsTo(User, { foreignKey: "user_id" });

// One-to-many relationship between Resource and Complaint (One Resource has many Complaints)
Resource.hasMany(Complaint, { foreignKey: "resource_id" });
Complaint.belongsTo(Resource, { foreignKey: "resource_id" });

// One-to-many relationship between Team and User (One Team has many Employees)
Team.hasMany(User, { foreignKey: "team_id" });
User.belongsTo(Team, { foreignKey: "team_id" }); // Only employees will have a team_id

// One-to-many relationship between Team and Complaint (One Team can be assigned many Complaints)
Team.hasMany(Complaint, { foreignKey: "team_id" });
Complaint.belongsTo(Team, { foreignKey: "team_id" }); // Complaints can be assigned to a specific team

module.exports = {
  User,
  Area,
  Resource_Type,
  Resource,
  Reservation,
  Complaint,
  Team,
};
