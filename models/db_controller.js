var mysql = require("mysql");
var express = require("express");
const router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospital",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Database conectado!");
  }
});

module.exports = router;

module.exports.signup = function (username, email, password, status, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};

module.exports.getuserid = function (email, callback) {
  var query = "select *from verify where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.add_doctor = function (
  pnome,
  snome,
  email,
  crm,
  data_nasc,
  sexo,
  endereco,
  telefone,
  image,
  depto_nome,
  bio,
  callback
) {
  var query =
    "INSERT INTO `medico`( `pnome`, `snome`, `email`, `crm`, `data_nasc`, `sexo`, `endereco`, `telefone`, `image`, `depto_nome`, `bio`) VALUES ('" 
    + pnome + "','" 
    + snome + "','" 
    + email + "','" 
    + crm + "','"
    + data_nasc + "','" 
    + sexo + "','" 
    + endereco + "','" 
    + telefone + "','" 
    + image + "','" 
    + depto_nome + "','" 
    + bio + "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllDoc = function (callback) {
  var query = "select * from medico";
  con.query(query, callback);
};

module.exports.getDocbyId = function (id, callback) {
  var query = "select * from medico where id_medico =" + id;
  con.query(query, callback);
};

module.exports.getFornbyId = function (id, callback) {
  var query = "select * from fornecedor where id_fornecedor =" + id;
  con.query(query, callback);
};

module.exports.editDoc = function (
  id,
  pnome,
  snome,
  email,
  crm,
  data_nasc,
  sexo,
  endereco,
  telefone,
  image,
  depto_nome,
  bio,
  callback
) {
  var query =
    "update `medico` set `pnome`='" +
    pnome +
    "', `snome`='" +
    snome +
    "', `email`='" +
    email +
    "', `crm`='" +
    crm +
    "', `data_nasc`='" +
    data_nasc +
    "', `sexo`='" +
    sexo +
    "', `endereco`='" +
    endereco +
    "', `telefone`='" +
    telefone +
    "', `image`='" +
    image +
    "', `depto_nome`='" +
    depto_nome +
    "', `bio`='" +
    bio +
    "' where id_medico=" +
    id;
  con.query(query, callback);
};


module.exports.editForn = function (
  id,
  nome,
  email,
  cnpj,
  inicio_contrato,
  area,
  valor,
  endereco,
  callback
) {
  var query =
    "update `fornecedor` set `nome`='" +
    nome +
    "', `email`='" +
    email +
    "', `cnpj`='" +
    cnpj +
    "', `inicio_contrato`='" +
    inicio_contrato +
    "', `area`='" +
    area +
    "', `valor`='" +
    valor +
    "', `endereco`='" +
    endereco +
    "' where id_fornecedor=" +
    id;
  con.query(query, callback);
};

module.exports.deleteDoc = function (id, callback) {
  var query = "delete from medico where id_medico=" + id;
  con.query(query, callback);
};

module.exports.deleteForn = function (id, callback) {
  var query = "delete from fornecedor where id_fornecedor=" + id;
  con.query(query, callback);
};

module.exports.deleteProd = function (id, callback) {
  var query = "delete from produtos where id_produtos=" + id;
  con.query(query, callback);
};
module.exports.deleteComplain = function(idComplain, callback) {
  var query = "DELETE FROM `reclamacoes` WHERE `ID_COMPLAIN` = ?";
  con.query(query, [idComplain], callback);
};
module.exports.postcomplain = function (
  mensagem,
  nome,
  email,
  assunto,
  callback
) {
  var query =
    "insert into complain (mensagem,nome,email,assunto) values ('" +
    mensagem +
    "','" +
    nome +
    "','" +
    email +
    "','" +
    assunto +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getcomplain = function (callback) {
  var query = "select * from complain";
  con.query(query, callback);
};

module.exports.add_consulta = function (
  p_nome,
  m_nome,
  depto,
  data,
  hora,
  callback
) {
  var query =
    "insert into consulta (paciente_nome, medico_nome, depto_nome, data, hora) values ('" +
    p_nome +
    "','" +
    m_nome +
    "','" +
    depto +
    "','" +
    data +
    "','" +
    hora +
    "')";
  con.query(query, callback);
};

module.exports.getallconsulta = function (callback) {
  var query = "select * from consulta";
  con.query(query, callback);
};

module.exports.searchDoc = function (key, callback) {
  var query = 'select  * from medico where pnome like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.searchProd = function (key, callback) {
  var query = 'SELECT  * from produtos where nome like "%' + key + '%"';
  con.query(query, callback);
};

module.exports.searchForn = function (key, callback) {
  var query = 'SELECT  *from fornecedor where nome  like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.searchReceipt = function (key, callback) {
  var query = 'SELECT  *from receita where id_consulta like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllReceipts = function(callback) {
  var query = "select *from receita"
  console.log(query);
  con.query(query, callback);
};


module.exports.getconsultabyid = function (id, callback) {
  var query = "select * from consulta where id_consulta=" + id;
  console.log(query);
  con.query(query, callback);
};

module.exports.editconsulta = function (
  id,
  p_nome,
  m_nome,
  depto,
  date,
  time,
  callback
) {
  var query =
    "update consulta set paciente_nome='" +
    p_nome +
    "',medico_nome='" +
    m_nome +
    "',depto_nome='" +
    depto +
    "',data='" +
    date +
    "',hora='" +
    time +
    "' where id_consulta=" +
    id;
  con.query(query, callback);
};

module.exports.deleteconsulta = function (id, callback) {
  var query = "delete from consulta where id_consulta=" + id;
  con.query(query, callback);
};
module.exports =router;


module.exports.addforn = function (
  nome,
  email,
  cnpj,
  inicio_contrato,
  area,
  valor,
  endereco,
  callback
){
  var query  =
  "insert into `fornecedor` (nome,email,cnpj,inicio_contrato,area,valor,endereco) values('" +
  nome +
  "','" +
  email +
  "','" +
  cnpj +
  "','" +
  inicio_contrato +
  "','" +
  area +
  "','" +
  valor +
  "','" +
  endereco +
  "')";

  con.query(query, callback);
  console.log(query);
}


module.exports.addprod = function (
  fabricante,
  fornecedor,
  nome,
  validade,
  tipo,
  lote,
  quantidade,
  callback
) {
  var query =
    "insert into produtos (fabricante, fornecedor, nome, validade, tipo, lote, quantidade) values ('" +
    fabricante +
    "','" +
    fornecedor +
    "','" +
    nome +
    "','" +
    validade +
    "','" +
    tipo +
    "','" +
    lote +
    "','" +
    quantidade +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getProdbyId = function (id, callback) {
  var query = "select * from produtos where id_produtos=" + id;
  con.query(query, callback);
};

module.exports.editprod = function (
  id,
  fabricante,
  fornecedor,
  nome,
  validade,
  tipo,
  lote,
  quantidade,
  callback
) {
  var query =
    "update produtos set fabricante='" +
    fabricante +
    "',fornecedor='" +
    fornecedor +
    "',nome='" +
    nome +
    "',validade='" +
    validade +
    "',tipo='" +
    tipo +
    "',lote='" +
    lote +
    "',quantidade='" +
    quantidade +
    "' where id_produtos=" +
    id;

  console.log(query);
  con.query(query, callback);
};

module.exports.getallprod = function (callback) {
  var query = "select *from produtos order by id_produtos desc";
  console.log(query);
  con.query(query, callback);
};

module.exports.getAllforn = function (callback) {
  var query = "select * from fornecedor";
  con.query(query, callback);
};

module.exports.add_contrato = function (
  fornecedor,
  tipo_contrato,
  data_inicio,
  data_termino,
  razao,
  callback
) {
  var query =
  "insert into contrato (fornecedor, tipo_contrato, data_inicio, data_termino,razao) values ('" +
  fornecedor +
  "','" +
  tipo_contrato +
  "','" +
  data_inicio +
  "','" +
  data_termino +
  "','" +
  razao +
  "')";
  
  console.log(query);
  con.query(query, callback);
};

module.exports.getAllContract = function (callback) {
  var query = "select * from contrato";
  con.query(query, callback);
};
module.exports.updateResetToken = function(email, resetToken, callback) {
  var query = "UPDATE users SET RESET_TOKEN = '" + resetToken + "' WHERE email = '" + email + "'";
  con.query(query, callback);
  console.log(query); 
};

module.exports.matchResetToken = function(token, newPassword, callback) {
  var query = "UPDATE users SET password = '" + newPassword + "' WHERE reset_token = '" + token + "'";
  con.query(query, callback);
  console.log(query); 
};

module.exports.matchAndVerifyToken = function(token, callback) {
  var query =
    "UPDATE users u " +
    "JOIN verify v ON u.email = v.email " +
    "SET u.email_status = 'verified' " +
    "WHERE v.token = ?";
  con.query(query, [token], callback);
};

module.exports.add_depto = function (nome, desc, callback) {
  var query =
    "insert into depto(depto_nome,depto_desc) values ('" +
    nome +
    "','" +
    desc +
    "')";
  con.query(query, callback);
};

module.exports.getalldepto = function (callback) {
  var query = "select * from depto";
  con.query(query, callback);
};

module.exports.delete_depto = function (id, callback) {
  var query = "delete from depto where id_depto=" + id;
  con.query(query, callback);
};

module.exports.getdeptobyId = function (id, callback) {
  var query = "select * from depto where id_depto=" + id;
  con.query(query, callback);
};

module.exports.edit_depto = function (id, name, desc, callback) {
  var query =
    "update depto set depto_nome='" +
    name +
    "',depto_desc='" +
    desc +
    "' where id_depto=" +
    id;
  con.query(query, callback);
};


module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};

module.exports.add_receita = function (
  id_consulta,
  produtos,
  descricao,
  callback
) {
  var query =
    "insert into receita (id_consulta,produtos,descricao) values ('" +
    id_consulta +
    "','" +
    produtos +
    "','" +
    descricao +
    "')";
  con.query(query, callback);
  console.log(query);
}

module.exports.getreceitabyid = function (id, callback) {
  var query = "select * from receita where id_receita=" + id;
  con.query(query, callback);
  console.log(query);
}

module.exports.deletereceita = function (id, callback) {
  var query = "delete from receita where id_receita=" + id;
  con.query(query, callback);
  console.log(query);
}

module.exports.edit_receita = function (
  id,
  id_consulta,
  produtos,
  descricao,
  callback
) {
  var query =
    "update receita set id_consulta='" +
    id_consulta +
    "',produtos='" +
    produtos +
    "',descricao='" +
    descricao +
    "' where id_receita=" +
    id;
  con.query(query, callback);
  console.log(query);
}


module.exports.getcontratobyid = function (id, callback) {
  var query = "select * from contrato where id_contrato=" + id;
  con.query(query, callback);
};

module.exports.deletecontrato = function (id, callback) {
  var query = "delete from contrato where id_contrato=" + id;
  con.query(query, callback);
};

module.exports.edit_contrato = function (
  id,
  fornecedor,
  tipo_contrato,
  data_inicio,
  data_termino,
  razao,
  callback
) {
  var query =
    "update contrato set fornecedor='" +
    fornecedor +
    "',tipo_contrato='" +
    tipo_contrato +
    "',data_inicio='" +
    data_inicio +
    "',data_termino='" +
    data_termino +
    "',razao='" +
    razao +
    "' where id_contrato=" +
    id;
  con.query(query, callback);
};
