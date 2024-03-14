var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getallconsulta(function(err,result){
        res.render('appointment.ejs',{list :result});
    })
    
});

router.get('/add_appointment',function(req,res){
    res.render('add_appointment.ejs');
});

router.post('/add_appointment',function(req,res){

    db.add_consulta(req.body.p_nome,req.body.m_nome, req.body.depto, req.body.data, req.body.hora, function(err,result){
        res.redirect('/appointment');
    });

});


router.get('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.getconsultabyid(id,function(err,result){
        console.log(result);
        res.render('edit_appointment.ejs',{list : result});
    });

});

router.post('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.editconsulta(id,req.body.p_nome,req.body.m_nome, req.body.depto, req.body.data, req.body.hora, function(err,result){
        res.redirect('/appointment');
    });
});


router.get('/delete_appointment/:id',function(req,res){
    var id = req.params.id;
    db.getconsultabyid(id,function(err,result){
        console.log(result);
        res.render('delete_appointment.ejs',{list:result});
    })
    
});

router.post('/delete_appointment/:id',function(req,res){
    var id =req.params.id;
    db.deleteconsulta(id,function(err,result){
        res.redirect('/appointment');
    });
})









module.exports = router;