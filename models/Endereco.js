const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = require("./Usuario");

const Comunidade = require("./Comunidade");

const Endereco = db.define("tb_endereco", {
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  nm_casa: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

// Um usuario pra um endereco
User.hasOne(Endereco);
Endereco.belongsTo(User);

// // Um endereco pra uma comunidade
// Endereco.hasMany(Comunidade);
// Comunidade.belongsTo(Endereco);

module.exports = Endereco;
