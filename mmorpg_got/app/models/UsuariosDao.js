function UsuariosDAO(connection){
	this._connection = connection;
}


UsuariosDAO.prototype.save = function(usuario){
		
		
		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("usuarios").insertOne(usuario, function(err, res) {
		    if (err) throw err;
		    db.close();
		  });

		});

		
}



UsuariosDAO.prototype.autenticar = function(usuario, req, res){
		
		
		this._connection.client.connect(this._connection.url, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db("got");

		  dbo.collection("usuarios").find(usuario).toArray(function(err, result) {
		    
		    if (err) throw err;
		    
		    if(result[0] != undefined){
		    	req.session.autorizado = true; 
		    	req.session.usuario = result[0].usuario;
		    	req.session.casa = result[0].casa;

		    }else{
		    	req.session.autorizado = false; 	
		    }

		    console.log(req.session.autorizado);

			if(req.session.autorizado){
				res.redirect('jogo');
			}else{
				res.render('index', {validacao : {}});
			}	

		    db.close();

		  });

		});

		
}


module.exports = function(){
	return UsuariosDAO;
}
