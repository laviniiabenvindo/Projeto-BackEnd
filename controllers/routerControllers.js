const Usuario = require("../models/Usuario");
const Comunidade = require("../models/Comunidade");
const Telefone = require("../models/Telefone");
const Endereco = require("../models/Endereco");
const Indicadores = require("../models/Indicadores");
const Denuncia = require("../models/Denuncia");
const Dados = require("../models/Dados");

module.exports = class routerController {
  static async home(request, response) {
    return response.render("templates/pagina-inicial");
  }
  static async cadastro(request, response) {
    return response.render("templates/cadastro");
  }
  static async viewDenuncia(request, response) {
    return response.render("templates/view-denuncia");
  }
  static async addDenuncia(request, response) {
    return response.render("templates/add_denuncia");
  }
};
