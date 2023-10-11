const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Comunidade = require("./Comunidade");

const Indicadores = db.define("tb_indicadores", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  unidade_medida: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  ano_base: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Indicadores.belongsTo(Comunidade);
Comunidade.hasMany(Indicadores);

module.exports = Indicadores;
