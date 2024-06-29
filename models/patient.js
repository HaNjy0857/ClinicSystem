const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255], // 可以根据需求调整
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // 可以根据需求调整
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 255], // 可以根据需求调整
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
});

module.exports = Patient;
