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
    db.getallprod(function(err,result){
        console.log(result);
        res.render('store.ejs',{list : result});
    })
    
});

router.get('/add_med',function(req,res){
    res.render('add_med.ejs');
});


router.post('/add_med',function(req,res){
 var nome = req.body.nome;
 var fabricante = req.body.fabricante;
 var fornecedor = req.body.fornecedor;
 var validade = req.body.validade;
 var tipo = req.body.tipo;
 var lote = req.body.lote;
 var quantidade = req.body.quantidade;

 db.addprod(fabricante,fornecedor,nome,validade,tipo,lote,quantidade,function(err,result){
    console.log(result);
    res.redirect('/store');
 });

});

router.get('/edit_med/:id',function(req,res){
    var id = req.params.id;
    db.getProdbyId(id,function(err,result){
        
        res.render('edit_med.ejs' ,{list : result});
    });
});

router.post('/edit_med/:id',function(req,res){
    var id = req.params.id;
    db.editprod(id,req.body.fabricante,req.body.fornecedor,req.body.nome,req.body.validade,req.body.tipo,req.body.lote,req.body.quantidade,function(err,result){
        res.redirect('/store');
    });

});

router.get('/delete_med/:id',function(req,res){
    var id = req.params.id;
    db.getProdbyId(id,function(err,result){
        
        res.render('delete_med.ejs' ,{list : result});
    });
});


router.post('/delete_med/:id',function(req,res){
    var id = req.params.id;
    
    db.deleteProd(id,function(err,result){
        res.redirect('/store');
    });

});


router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchProd(key,function(err,result){
        console.log(result);
        
        res.render('store.ejs',{list : result});
    });
});

module.exports = router ;