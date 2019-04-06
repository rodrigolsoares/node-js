'use strict';

module.exports = function(Usuario) {
	
   Usuario.status = function(cb) {
   
		var currentDate = new Date();
		var currentHour = currentDate.getHours();
		var OPEN_HOUR = 6;
		var CLOSE_HOUR = 20;
		console.log('Current hour is %d', currentHour);
		var response;
		if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
		  response = 'We are open for business.';
		} else {
		  response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
		}
		cb(null, response);
		
  };
  
  Usuario.remoteMethod(
    
	'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );
	
	
  Usuario.getName = function(usuarioId, cb) {
    
	if(usuarioId == null){
		var response = "id do usuário é inválido ";
		cb(null, response);
	}
	else{
	
		Usuario.findById( usuarioId, function (err, instance) {

			console.log(usuarioId);
			console.log(instance);
			
			var response; 
			
			if(instance != null){
				response = "login do usuário is " + instance.login;
			}
			else{
				response = "Nome não encontrado ";
			}
			
			cb(null, response);
			console.log(response);
		});
	
	}
  }
  
  Usuario.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
    );
	
	
	Usuario.atualizarTodasSenha = function(novaSenha, cb) {
    

		Usuario.updateAll( {senha : novaSenha}, function (err, instance) {

				console.log(novaSenha);
				console.log(instance);
				
				var response = 'senhas alteradas'; 
				
				console.log('serviço novo');
				
				cb(null, response);
				console.log(response);
		});
		
		
   };
  
  Usuario.remoteMethod (
        'atualizarTodasSenha',
        {
          http: {path: '/atualizarTodasSenha', verb: 'post'},
          accepts: {arg: 'novaSenha', type: 'String' },
          returns: {arg: 'resultado', type: 'string'}
        }
    );
};
