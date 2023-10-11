const express = require("express");
const router = express.Router();

const routerController = require("../controllers/routerControllers");

router.get("/", routerController.home);
router.get("/cadastro", routerController.cadastro);
router.get("/denuncias/visualizar", routerController.viewDenuncia);
router.get("/user/adddenuncia/addinfo", routerController.addDenuncia);
router.get("/user/adddenuncia", routerController.postarDenny)
router.get("/user/verdenuncia", routerController.verpostagens)


module.exports = router;
