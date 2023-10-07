const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  return response.render("templates/pagina-inicial");
});
router.get("/denuncias/visualizar", (request, response) => {
  return response.render("templates/view-denuncia");
});
router.get("/user/adddenuncia/addinfo", (request, response) => {
  return response.render("templates/add_denuncia");
});

module.exports = router;
