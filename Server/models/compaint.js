const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Complaint = sequelize.define(
  "Complaint",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    resource_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Resources",
        key: "id",
      },
    },
    team_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "Teams",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    complaint_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handler_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Complaints",
    timestamps: false,
  }
);

module.exports = Complaint;
