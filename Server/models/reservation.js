const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    resource_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Resources",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reservation_status: {
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
    tableName: "Reservations",
    timestamps: false,
  }
);

module.exports = Reservation;
