const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const conn = require("./db/conn");
const app = express();
const port = 5000;

const router = require("./routes/router");
const routerController = require("./controllers/routerControllers");

// MIDDLEWARES
app.use(
  session({
    name: "session",
    secret: "nosso_secrect",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// Importing flash module after setting up the session middleware
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// EXPORTING THE MODELS
const Usuario = require("./models/Usuario");
const Comunidade = require("./models/Comunidade");
const Telefone = require("./models/Telefone");
const Endereco = require("./models/Endereco");
const Indicadores = require("./models/Indicadores");
const Denuncia = require("./models/Denuncia");
const Dados = require("./models/Dados");

app.use((request, response, next) => {
  if (request.session.usuarioId) {
    response.locals.session = request.session;
  }
  next();
});

app.use("/", routerController);

conn.sync()
  .then(() => {
    app.listen(port)
  })
  .catch((err) => console.log(err));
