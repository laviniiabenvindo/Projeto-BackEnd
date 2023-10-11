const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Dados = db.define("tb_dados", {
  valor_indicador: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  ano_dados: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = Dados;
