'use strict';

var app = require('../../server/server');

module.exports = function(Teste) {

Teste.helloword = function(novaSenha, cb) {
	var response = 'We are open for business.';	

	app.models.Usuario.atualizarTodasSenha(novaSenha, cb);

	
		
};
  
  Teste.remoteMethod (
        'helloword',
        {
          http: {path: '/helloword', verb: 'post'},
          accepts: {arg: 'novaSenha', type: 'String' },
          returns: {arg: 'resultado', type: 'string'}
        }
    );

};
