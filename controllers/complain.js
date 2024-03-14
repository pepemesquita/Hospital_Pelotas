var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');

var router = express.Router();
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
 
    res.render ('complain.ejs');
});

router.post('/',function(req,res){

    var mensagem = req.body.mensagem;
    var nome = req.body.nome;
    var email = req.body.email;
    var assunto = req.body.assunto;

    db.postcomplain(mensagem,nome,email,assunto,function(err,result){
        res.redirect('back');
    });

    var idComplain = 1; // 
});

router.get('/delete_complain/:id',function(req,res){
    var id = req.params.id;
    db.deletecomplain(id,function(err,result){
        res.redirect('back');
    });
});






module.exports = router;