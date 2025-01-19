const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const User = sequelize.define(
  "Resource",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    resource_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "Resources",
    timestamps: false, // Manually we will define timestamps i.e created_at & updated_at
  }
);

module.exports = User;
