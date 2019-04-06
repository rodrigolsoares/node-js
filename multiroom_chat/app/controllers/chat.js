module.exports.iniciaChat = function(application, req, resp){
	
	/*Recupera os atributos do form*/
	var dadosForm = req.body;

	console.log(dadosForm);

	/*Validando campos*/
	req.assert('apelido', 'Apelido, é obrigatório').notEmpty();
	req.assert('apelido', 'Apelido, deve conter, entre 3 e 15 caracteres').len(3,15);

	var erros = req.validationErrors();

	if(erros){
		resp.render('index', {validacao : erros});
		return;
	}

	application.get('io').emit(
		'msgParaCliente', 
		 {apelido : dadosForm.apelido , mensagem : ' ababou de entrar no chat.'}
	);

	resp.render('chat', {dadosForm: dadosForm});
}