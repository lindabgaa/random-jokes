const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Joke = sequelize.define("Joke", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Joke;
