var mysql = require('mysql');

var connMsql = function(){
	
	console.log('A conexão com o banco foi estabelecida');

	return  mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'admin',
		database : 'portal_noticias',
		port: '3306'
	});
}	


module.exports = function(){
	console.log('O autoload carregou o módulo de conexão com o bando de dados');
	return connMsql;
};