const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Denuncia = db.define("tb_denuncia", {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  dt_denuncia: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  hr_denuncia: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = Denuncia;
