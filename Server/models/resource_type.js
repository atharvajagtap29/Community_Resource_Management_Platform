const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Resource_Type = sequelize.define(
  "Resource_Type",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    resource_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
    tableName: "Resource_Types",
    timestamps: false,
  }
);

module.exports = Resource_Type;
