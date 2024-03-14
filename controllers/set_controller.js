var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
const { check, validationResult } = require("express-validator");
var mysql = require("mysql");
const { route } = require("./doc_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("setpassword.ejs");
});

router.post(
    "/",
    [
      check("token").notEmpty().withMessage("Token é obrigatório"),
      check("password").notEmpty().withMessage("A nova senha é obrigatória"),
    ], function(req, res) {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var token = req.body.token;
    var newPassword = req.body.password;
    
    db.matchResetToken(token, newPassword, function(err, result) {
    if (err) {
      console.error("Erro ao atualizar a senha:", err);
      return res.status(500).send("Erro ao atualizar a senha.");
    }
    res.send("A senha foi alterada com sucesso.");
    console.log(result);
  });
});

module.exports = router;
