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
const User = require("./models/User");

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
