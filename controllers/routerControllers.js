const Usuario = require("../models/Usuario");
const Comunidade = require("../models/Comunidade");
const Telefone = require("../models/Telefone");
const Endereco = require("../models/Endereco");
const Indicadores = require("../models/Indicadores");
const Denuncia = require("../models/Denuncia");
const Dados = require("../models/Dados");

const bcrypt = require("bcryptjs");

module.exports = class routerController {
  static async login(request, response) {
    return response.render("templates/login");
  }
  static async cadastroPessoal(request, response) {
    return response.render("templates/cadastro");
  }

  static async cadastroPessoalPost(request, response) {
    const {
      nome,
      sobrenome,
      dt_nascimento,
      cpf,
      nm_telefone,
      email,
      confirmarEmail,
      senha,
      confirmarSenha,
      cep,
      rua,
      estado,
      cidade,
      nm_casa,
      complemento,
    } = request.body;

    if (email != confirmarEmail) {
      request.flash("message", "Os E-mails não conferem, tente novamente");
      response.render("templates/cadastro");
      return;
    }

    if (senha != confirmarSenha) {
      request.flash("message", "As senhas não conferem, tente novamente");
      response.render("templates/cadastro");
      return;
    }

    const checkIfUserExist = await Usuario.findOne({ where: { email: email } });

    if (checkIfUserExist) {
      request.flash("message", "O e-mail já está em uso");
      response.render("templates/cadastro");
      return;
    }

    const checkIfCpfExist = await Usuario.findOne({
      where: { cpf: cpf },
    });

    if (checkIfCpfExist) {
      request.flash("message", "O CPF já está em uso");
      response.render("templates/cadastro");
      return;
    }

    const checkIfTelefoneExist = await Telefone.findOne({
      where: { nm_telefone: nm_telefone },
    });

    if (checkIfTelefoneExist) {
      request.flash("message", "O telefone já está em uso");
      response.render("templates/cadastro");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(senha, salt);

    try {
      // Create endereco entry
      const endereco = await Endereco.create({
        cep,
        rua,
        estado,
        cidade,
        nm_casa,
        complemento,
      });

      const telefone = await Telefone.create({
        nm_telefone,
      });

      // Create usuario entry with enderecoId
      const createUser = await Usuario.create({
        nome,
        sobrenome,
        dt_nascimento,
        cpf,
        nm_telefone,
        email,
        senha: hashedPassword,
        enderecoId: endereco.id,
        telefoneId: telefone.id,
      });

      request.session.usuarioId = createUser.id;

      request.flash("message", "Cadastro Realizado com sucesso");

      request.session.save(() => {
        response.redirect("/home");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginPost(request, response) {
    const { email, senha } = request.body;

    const user = await Usuario.findOne({ where: { email: email } });

    if (!user) {
      request.flash("message", "Usuário não encontrado");
      return response.render("templates/login");
    }

    request.session.usuarioId = user.id;

    request.flash("message", `Seja bem-vindo ${user.nome}`); // Corrigido de user.name para user.nome
    request.session.save(() => {
      return response.redirect("/home");
    });
  }

  static async viewDenuncia(request, response) {
    return response.render("templates/view-denuncia");
  }
  
  static async addDenuncia(request, response) {

    // const id = request.params.id;

    // const denuncia = await Usuario.findOne({ where: { id: id }, raw: true });

    // console.log(denuncia);

    return response.render("templates/add_denuncia");
  }
  static async postarDenny(request, response) {
    return response.render("templates/postar_denny");
  }
  static async verpostagens(request, response) {
    return response.render("templates/verpostagens");
  }
  static async selecOptions(request, response) {
    return response.render("templates/selecOptions");
  }
};
