const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_id: {
      type: DataTypes.STRING, // Datatype of this field that is there in the areas table
      allowNull: true,
      references: {
        model: "Areas", // Actual SQL table name that is created
        key: "id", // Column name [primary key] in Areas table
      },
    },
    team_id: {
      type: DataTypes.STRING,
      allowNull: true, // for non employers
      references: {
        model: "Teams",
        key: "id",
      },
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
    tableName: "Users",
    timestamps: false, // Manually we will define timestamps i.e created_at & updated_at
  }
);

module.exports = User;
