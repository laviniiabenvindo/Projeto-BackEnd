const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Endereco = require('./Endereco');
const Telefone = require('./Telefone')

const User = db.define("tb_usuario", {
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
  },
  enderecoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Endereco,
      key: 'id',
    },
  },
  telefoneId: {
    type: DataTypes.INTEGER,
    references: {
      model: Telefone,
      key: 'id',
    },
  },
});

// Um usuario pra um endereco
User.hasOne(Endereco);
Endereco.belongsTo(User);


User.hasMany(Telefone);
Telefone.belongsTo(User);

module.exports = User;
