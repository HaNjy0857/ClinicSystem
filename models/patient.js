const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define("Patient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 255],
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
