var db = require('./db_controller.js');
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');



var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports.validLeave = function(req){
    req.check('nome' , 'Nome é obrigatório').notEmpty();
}