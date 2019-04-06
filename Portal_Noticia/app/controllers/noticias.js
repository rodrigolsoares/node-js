module.exports.noticias = function(application, req, resp){

	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);

	noticiasDAO.getNoticias(function(error, result){
		resp.render('noticias/noticias', {noticias: result});
	});

}


module.exports.noticia = function(application, req, resp){

	var connection = application.config.dbConnection();
	var noticiasDAO = new application.app.models.NoticiasDAO(connection);
	var jsonParam = req.query;

	console.log(jsonParam.id_noticia);

	noticiasDAO.getNoticia(jsonParam.id_noticia, function(error, result){
		resp.render('noticias/noticia', {noticia: result});
	});
		
}