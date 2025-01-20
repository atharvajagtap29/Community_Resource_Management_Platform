const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Resource_Request = sequelize.define(
  "Resource_Request",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    resource_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resource_type_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Resource_Types",
        key: "id",
      },
    },
    area_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Areas",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    request_status: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Resource_Requests",
    timestamps: false,
  }
);

module.exports = Resource_Request;
