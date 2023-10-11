const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Comunidade = db.define("tb_comunidade", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = Comunidade;