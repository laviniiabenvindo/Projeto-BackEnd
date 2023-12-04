const { DataTypes } = require("sequelize");
const db = require("../db/conn");


const Telefone = db.define("tb_telefone", {
  nm_telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});


module.exports = Telefone;
