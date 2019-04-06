function NoticiasDAO(connection){
	this._connection = connection;
}


NoticiasDAO.prototype.getNoticias = function(callback){
		this._connection.query('select * from noticias order by data_criacao desc', callback);
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback){
		this._connection.query('select * from noticias order by 1 desc limit 5', callback);
}

NoticiasDAO.prototype.getNoticia = function(idNoticia, callback){
		this._connection.query('select * from noticias where id_noticia = ' + idNoticia, callback);
}

NoticiasDAO.prototype.saveNoticia = function(noticia, callback){
		this._connection.query("insert into noticias set ? ", noticia, callback); 
}


module.exports = function(){
	return NoticiasDAO;
}