const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Denuncia = db.define("tb_denuncia", {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = Denuncia;
