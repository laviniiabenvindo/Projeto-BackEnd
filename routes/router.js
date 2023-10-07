const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  return response.render("templates/pagina-inicial");
});
router.get("/cadastro", (request, response) =>{
  return response.render("templates/cadastro")
});
router.get("/denuncias/visualizar", (request, response) => {
  return response.render("templates/home");
});
router.get("/user/adddenuncia/addinfo", (request, response) => {
  return response.render("templates/add_denuncia");
});


module.exports = router;
