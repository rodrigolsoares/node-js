function JogoDAO(connection){
	this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario){
		
		
		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("jogo").insertOne(
		   {	
		   		usuario: usuario,
		   		moeda : 15,
		   		suditos: 10,
		   		temor: Math.floor(Math.random()*1000),
		   		sabedoria: Math.floor(Math.random()*1000),
		   		commercio: Math.floor(Math.random()*1000),
		   		magia: Math.floor(Math.random()*1000)
		   }
		  	, function(err, res) {
		    	if (err) throw err;
		   
		    	db.close();
		  });

		});

		
}

JogoDAO.prototype.iniciaJogo = function(usuario, res, casa, msg){
		
		
		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("jogo").find({usuario : usuario}).toArray(function(err, result) {
		    

		    res.render('jogo', {img_casa: casa, jogo: result[0], msg : msg});
		    db.close();

		  });

		});

		
}

JogoDAO.prototype.acao = function(acao){
		
		var date = new Date();
		var tempo = null;

		switch(parseInt(acao.acao)){
			case 1 : tempo = 1 * 60 *60000; break;
			case 2 : tempo = 2 * 60 *60000; break;
			case 3 : tempo = 5 * 60 *60000; break;
			case 4 : tempo = 5 * 60 *60000; break;
		}


		acao.acao_termina_em = date.getTime() + tempo;
		
		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("acao").insertOne(acao, function(err, res) {
		    	if (err) throw err;
		   
		    	db.close();
		  });

		});


		
}


JogoDAO.prototype.getAcoes = function(usuario, res){
		
		var date = new Date();
		var momentoAtual =  date.getTime();

		console.log(momentoAtual);

		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("acao").find({usuario : usuario, acao_termina_em : {$gt: momentoAtual} }).toArray(function(err, result) {
		  	res.render('pergaminhos', {acoes : result});
		    db.close();
		  });

		});

		
}

module.exports = function(){
	return JogoDAO;
}