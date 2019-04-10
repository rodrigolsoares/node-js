module.exports.iniciar = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	console.log(req.query.msg);

	var msg = '';
	if(req.query.msg !==''){
		msg = req.query.msg;
	}

	
	var connection = application.config.dbConnection;
	var jogoDao = new application.app.models.JogoDao(connection);
	jogoDao.iniciaJogo(req.session.usuario, res, req.session.casa, msg);

}

module.exports.suditos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	res.render('aldeoes');
}

module.exports.pergaminhos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	var connection = application.config.dbConnection;
	var jogoDao = new application.app.models.JogoDao(connection);
	jogoDao.getAcoes(req.session.usuario, res);

}


module.exports.ordenar_acoes_sudito = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	var dadosForm = req.body;

	req.assert('acao','Ação, deve ser informada').notEmpty();
	req.assert('quantidade','Quantidade, deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=A');
		return;
	}

	dadosForm.usuario = req.session.usuario;

	var connection = application.config.dbConnection;
	var jogoDao = new application.app.models.JogoDao(connection);
	jogoDao.acao(dadosForm);

	res.redirect('jogo?msg=B')
}




module.exports.sair = function(application, req, res){
	
	req.session.destroy(function(err){
		res.render('index', {validacao: {}});
	});
}
