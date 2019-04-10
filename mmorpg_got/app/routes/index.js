module.exports = function(application){
	
	application.get('/', function(req, res){
		application.app.controllers.home.index(application, req, res);
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.home.autenticar(application, req, res);
	});

}