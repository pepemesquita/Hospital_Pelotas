var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;

router.get('/', function (req, res) {
    res.render('verify.ejs');
});

router.post('/', function (req, res) {
    var token = req.body.token;

    db.matchAndVerifyToken(token, function (err, result) {
        if (err) {
            console.error('Erro ao atualizar o status de verificação:', err);
            return res.status(500).send('Erro ao atualizar o status de verificação.');
        }

        if (result.affectedRows > 0) {
            console.log('Email verificado com sucesso.');
            res.status(200).send('Email verificado com sucesso.');
        } else {
            res.status(404).send('Token não encontrado ou email não correspondente.');
        }
    });
});

