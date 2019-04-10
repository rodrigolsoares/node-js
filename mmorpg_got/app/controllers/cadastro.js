module.exports.iniciar = function(application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm : {} });
}

module.exports.cadastrar = function(application, req, res){
	
	var dadosForm = req.body;

	console.log(dadosForm);

	req.assert('nome','Nome não pode ser vazio.').notEmpty();
	req.assert('usuario','Usuário não pode ser vazio.').notEmpty();
	req.assert('senha','Senha não pode ser vazio.').notEmpty();
	req.assert('casa','Casa não pode ser vazio.').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm : dadosForm});
		return;
	}

	var connection = application.config.dbConnection;
	var usuariosDao = new application.app.models.UsuariosDao(connection);
	var jogoDao = new application.app.models.JogoDao(connection);
	usuariosDao.save(dadosForm);
	jogoDao.gerarParametros(dadosForm.usuario);
	


	res.send('Podemos cadastrar');
	
	
}