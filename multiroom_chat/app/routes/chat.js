module.exports = function(application){

	application.get('/chat', function(req, resp){
		application.app.controllers.chat.iniciaChat(application, req, resp);
	});

	application.post('/chat', function(req, resp){
		application.app.controllers.chat.iniciaChat(application, req, resp);
	});

}