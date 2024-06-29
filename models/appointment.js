const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // 引入配置好的 sequelize 實例

const Appointment = sequelize.define(
  "Appointment",
  {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Scheduled",
    },
  },
  {
    timestamps: true, // 添加 createdAt 和 updatedAt 欄位
  }
);

module.exports = Appointment;
