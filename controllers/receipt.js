var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db_controller');
const { validationResult } = require('express-validator');

router.get('*', function(req, res, next) {
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    db.getAllReceipts(function(err, result) {
        if (err) {
            console.error('Erro ao buscar todas as receitas:', err);
            res.status(500).send('Erro ao buscar as receitas');
        } else {
            res.render('receipt.ejs', { receipts: result });
        }
    });
});

router.get('/add', function(req, res) {
    res.render('add_receipt.ejs');
});

router.post('/add', function(req, res) {
    db.add_receita(req.body.id_consulta, req.body.produtos, req.body.descricao, function(err, result) {
        if (err) {
            console.error('Erro ao adicionar a receita:', err);
            res.status(500).send('Erro ao adicionar a receita');
        } else {
            console.log('Receita adicionada com sucesso!');
            res.redirect('/receipt');
        }
    });
});

router.get('/edit/:id',function(req,res){
    var id = req.params.id;

    db.getreceitabyid(id,function(err,result){

        
            res.render('edit_receipt.ejs' ,{list : result});
       
        
    });
});

router.post('/edit/:id', function(req, res) {
    var id = req.body.id;
    db.edit_receita(id, req.body.id_consulta, req.body.produtos, req.body.descricao, function(err, result) {
        if (err) {
            console.error('Erro ao editar a receita:', err);
            res.status(500).send('Erro ao editar a receita');
        } else {
            console.log('Receita editada com sucesso!');
            res.redirect('/receipt');
        }
    });
});

router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    db.getreceitabyid(id, function(err, result) {
        if (err) {
            console.error('Erro ao buscar a receita para exclusão:', err);
            res.status(500).send('Erro ao buscar a receita para exclusão');
        } else {
            res.render('delete_receipt.ejs', { receipt: result });
        }
    });
});

router.post('/delete/:id', function(req, res) {
    var id = req.params.id;
    db.deleteReceipt(id, function(err, result) {
        if (err) {
            console.error('Erro ao excluir a receita:', err);
            res.status(500).send('Erro ao excluir a receita');
        } else {
            console.log('Receita excluída com sucesso!');
            res.redirect('/receipt');
        }
    });
});

router.post('/search', function(req, res) {
    var key = req.body.search;
    db.searchReceipt(key, function(err, result) {
        if (err) {
            console.error('Erro ao pesquisar a receita:', err);
            res.status(500).send('Erro ao pesquisar a receita');
        } else {
            res.render('receipt.ejs', { receipts: result });
        }
    });
});

module.exports = router;
