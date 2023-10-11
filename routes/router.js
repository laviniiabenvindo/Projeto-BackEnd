const express = require("express");
const router = express.Router();

const routerController = require("../controllers/routerControllers");

router.get("/", routerController.home);
router.get("/cadastro", routerController.cadastro);
router.get("/denuncias/visualizar", routerController.viewDenuncia);
router.get("/user/adddenuncia/addinfo", routerController.addDenuncia);

module.exports = router;
