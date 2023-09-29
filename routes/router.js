const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  return response.render("templates/home");
});

module.exports = router;
