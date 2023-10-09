const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const sequelize = db.define("Users", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  dt_nascimento: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  }
});

module.exports = sequelize;
