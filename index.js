const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes/router");
const conn = require("./db/conn");
const app = express();
const port = 5000;

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//EXPORTANDO OS MODELS
const Usuario = require("./models/Usuario");
const Comunidade = require("./models/Comunidade");
const Telefone = require("./models/Telefone");
const Endereco = require("./models/Endereco");
const Indicadores = require("./models/Indicadores");
const Denuncia = require("./models/Denuncia");
const Dados = require("./models/Dados");

conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
// {force:true}
