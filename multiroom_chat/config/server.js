/*Importar os módulos do framework express*/
var express = require('express');

/*Importar os módulos do framework consign*/
var consign = require('consign');

/*Importar os módulos do framework body-parser*/
var bodyParser = require('body-parser');

/*Importar os módulos do framework express-validator*/
var expressValidator = require('express-validator');

/*Iniciar o objeto do express*/
var app = express();

/*setar variáveis 'view engine' e 'views' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');


/*Configurando o middleware, body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/*Configurando o middleware, express.static*/
app.use(express.static('./app/public'));

/*Configurando o middleware, express-validator*/
app.use(expressValidator());


/*Configurando o consign, efetua as rotas, os models, constrollers*/
consign()
	.include('app/routes')
	//.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/*exportar o objeto app*/
module.exports = app;