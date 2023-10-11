const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = require("./Usuario");

const Telefone = db.define("tb_telefone", {
  nm_telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  tipo_telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Telefone.belongsTo(User);
User.hasMany(Telefone);

module.exports = Telefone;
