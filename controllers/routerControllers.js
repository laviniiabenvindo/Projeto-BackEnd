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

    request.flash("message", `Seja bem-vindo ${user.nome}`); 
    request.session.save(() => {
      return response.redirect("/home");
    });
  }

  static async viewDenuncia(request, response) {
    try {
      const show = await Denuncia.findAll({ raw: true });
      return response.render("templates/view-denuncia", { show });
    } catch (error) {
      console.log(error);
    }
  }

  static async addDenuncia(request, response) {
    return response.render("templates/add_denuncia");
  }
  static async addDenunciaPost(request, response) {
    const { descricao } = request.body
    try {
      const denuncia = {
        descricao,

      }
      const createDenuncia = await Denuncia.create(denuncia);

      response.redirect("/denuncias/visualizar");
    } catch (error) {
      console.log(error);
    }
  }
  static async postarDenny(request, response) {
    return response.render("templates/postar_denny");
  }
  
  static async verpostagens(request, response) {
    const id = request.params.id;
    try {
      const showPost = await Denuncia.findOne({ where: { id: id } });
  
      // Convertendo o objeto Sequelize para um objeto de dados simples - 
      // o Handlebars não estava acessando a descrição no model das denuncias
      const showPostPlain = showPost ? showPost.get({ plain: true }) : null;
  
      return response.render('templates/verpostagens', { showPost: showPostPlain });
    } catch (error) {
      console.error(error);
    }
  }
  
  

  static async selecOptions(request, response) {
    return response.render("templates/selecOptions");
  }
};
