const express = require("express");
const router = express.Router();

const routerController = require("../controllers/routerControllers");

router.get("/cadastro", routerController.cadastroPessoal);
router.post("/cadastro", routerController.cadastroPessoalPost);

router.get("/denuncias/visualizar", routerController.viewDenuncia);
router.get("/user/adddenuncia", routerController.postarDenny)
router.get("/user/verdenuncia", routerController.verpostagens)
router.get("/home", routerController.selecOptions)

router.get("/user/adddenuncia/addinfo", routerController.addDenuncia);
router.post("/user/adddenuncia/addinfo", routerController.addDenunciaPost);

router.get("/login", routerController.login)
router.post("/login", routerController.loginPost)


module.exports = router;
