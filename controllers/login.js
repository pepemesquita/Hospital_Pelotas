var express = require ('express');
var home = require('./home');
var mysql =require('mysql');
var session = require ('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
var  sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');



router.get('/', function(req ,res){
    res.render('login.ejs');
});

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '',
    database : 'hospital'
});

router.use(session({

    secret: 'secret',
    resave : true ,
    saveUninitialized : true 

}));


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.post('/',[
    check('username').notEmpty().withMessage("Usuario é obrigatório!"),
    check('password').notEmpty().withMessage("Senha é obrigatória!")
    
], function(request , response){
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
      }

    var username = request.body.username;
    var password = request.body.password;
    var status = request.body.email_status;
    
    if (username && password){
        con.query('SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ?', [username, password], function(error, results, fields){
            if (results.length > 0){
                
                request.session.loggedin = true ; 
                request.session.username = username;
                response.cookie('username' , username);
                
                if (status=="not_verified" ){
                    response.send("Por favor verifique seu email antes de fazer login!");
                }
                else{
                    console.log('Logado com sucesso!');
                    sweetalert.fire('Logado com sucesso!','Bem-vindo '+username+'!');
                    response.redirect('/home');
                }
               
            }else{
                response.send('Usuario ou senha incorretos!');
            }
            response.end();
        });

    }else{
        response.send('Por favor insira seu usuario e senha!');
        response.end();
    }

});

module.exports = router;