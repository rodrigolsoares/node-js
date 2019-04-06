/*Importando as configurações do servidor*/
var app = require('./config/server');


/*Iniciando servidor*/
var server = app.listen(80, function(){
	console.log('Servidore online');
});

var io = require('socket.io').listen(server);


app.set('io', io);

/*criar a conexão por websocket*/
io.on('connection', function(socket){

	/*Dentro deste callback. podemos criar vários eventos de escuta, e emissão*/
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');		
	});

	socket.on('msgParaServidor', function(data){

		/*Dialogo*/
		socket.emit(
			'msgParaCliente', 
		 	{apelido : data.apelido , mensagem : data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
		 	{apelido : data.apelido , mensagem : data.mensagem}
		);

		if(parseInt(data.apelido_atualizado) == 0){

			/*Participante*/
			socket.emit(
				'participanteParaClientes', 
			 	{apelido : data.apelido}
			);

			socket.broadcast.emit(
				'participanteParaClientes', 
			 	{apelido : data.apelido}
			);
			
		}

	});



});
