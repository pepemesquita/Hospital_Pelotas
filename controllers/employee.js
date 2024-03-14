var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
const { check, validationResult } = require('express-validator');

module.exports = router;



router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getAllforn(function(err,result){
        res.render('employee.ejs',{employee : result});

    });
   
});

router.get('/add',function(req,res){
    res.render('add_employee.ejs');
});

router.post('/add',function(req,res){
    var nome = req.body.nome;
    var email = req.body.email;
    var cnpj = req.body.cnpj;
    var inicio_contrato = req.body.inicio_contrato;
    var area = req.body.area;
    var valor = req.body.valor;
    var endereco = req.body.endereco;

    db.addforn(nome,email,cnpj,inicio_contrato,area,valor,endereco,function(err,result){
        console.log('Fornecedor adicionado!!');
        res.redirect('/employee');
    });

});


router.get('/leave',function(req,res){
    db.getAllContract(function(err,result){
       
        res.render('leave.ejs',{user : result});
    });
});

router.get('/add_leave',function(req,res){
    res.render('add_leave.ejs');
    
});

router.get('/edit_leave/:id',function(req,res){

    var id = req.params.id;
    db.getcontratobyid(id,function(err,result){
        res.render('edit_leave.ejs',{user:result});
    });
});

router.post('/edit_leave/:id',function(req,res){
    var id = req.params.id;
    db.edit_contrato(id,req.body.fornecedor, req.body.tipo_contrato,req.body.data_inicio,req.body.data_termino,req.body.razao,function(err,result){
        res.redirect('/employee/leave');
    });
});

router.get('/delete_leave/:id',function(req,res){
    var id = req.params.id;
    db.getcontratobyid(id,function(err,result){

        res.render('delete_leave.ejs' ,{user : result});
    });
});

router.post('/delete_leave/:id',function(req,res){
    var id = req.params.id;
    
    db.deletecontrato(id,function(err,result){
        res.redirect('/employee/leave');
    });

});



router.get('/edit_employee/:id',function(req,res){
    var id = req.params.id;
    db.getFornbyId(id,function(err,result){
        console.log(result);
        res.render('edit_employee.ejs' ,{list : result});
    });
});



router.post('/edit_employee/:id',function(req,res){
    var id = req.params.id;
    db.editForn(id,req.body.nome,req.body.email,req.body.cnpj,req.body.inicio_contrato,req.body.area,req.body.valor,req.body.endereco,function(err,result){
        res.redirect('/employee');
    });

});

router.get('/delete_employee/:id',function(req,res){
    var id = req.params.id;
    db.getFornbyId(id,function(err,result){

        res.render('delete_employee.ejs' ,{list : result});
    });
});

router.post('/delete_employee/:id',function(req,res){
    var id = req.params.id;
    
    db.deleteForn(id,function(err,result){
        res.redirect('/employee');
    });

});

router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchForn(key,function(err,result){
        console.log(result);
        
        res.render('employee.ejs',{employee : result});
    });
});


router.post('/add_leave', [
    check('nome').notEmpty(),
    check('tipo_contrato').notEmpty(),
    check('data_inicio').notEmpty().withMessage('Selecione uma data'),
    check('data_termino').notEmpty().withMessage('Selecione uma data'),
    check('razao').notEmpty().withMessage('Especifique a razão')
], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var idContrato = req.body.id_contrato; // Aqui você precisa pegar o ID do contrato do corpo da requisição
    db.add_contrato(idContrato, req.body.nome, req.body.tipo_contrato, req.body.data_inicio, req.body.data_termino, req.body.razao, function(err, result) {
        res.redirect('/employee/leave');
    });
});
