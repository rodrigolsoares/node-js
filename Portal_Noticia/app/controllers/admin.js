module.exports.formulario_inclusao_noticia = function(application, req, resp){
	resp.render('admin/form_add_noticia', {validacao : {},  noticia: {} });
}


module.exports.noticias_salvar = function(application, req, resp){
	
	var noticia = req.body;

	console.log(noticia);

	req.assert('titulo', 'Título é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo, deve conter entre 10 e 100 caracteres').len(10,100);;
	req.assert('autor', 'Autor é obrigatório').notEmpty();
	req.assert('data_noticia', 'Data de Nascimento inválida').notEmpty(); //.isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Noticia é obrigatório').notEmpty();

	console.log(noticia);

	var erros = req.validationErrors();

	console.log(erros);

	if(erros){
		resp.render('admin/form_add_noticia', {validacao: erros, noticia: noticia});
		return;
	}

	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.saveNoticia(noticia, function(error, result){
		resp.redirect('/noticias');

	});	
	
}