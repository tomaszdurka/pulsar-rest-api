var _ = require('underscore');
var restify = require('restify');

module.exports = (function() {

	var server = null;

	/**
	 * @param {Number} port
	 * @param {Object} [sslOptions]
	 * @param {Object} backend
	 * @param {Object} auth
	 * @constructor
	 */
	function REST(port, sslOptions, backend, auth) {
		server = restify.createServer({
			certificate: sslOptions ? sslOptions['cert'] : null,
			key: sslOptions ? sslOptions['key'] : null,
			name: 'pulsar-rest-api',
			version: '1.0.0'
		});

		if(auth) {
			server.use(auth.getParser());
		}

		server.use(restify.acceptParser(server.acceptable));
		server.use(restify.queryParser());
		server.use(restify.bodyParser());

		if(backend) {
			backend.rest(this);
		}

		server.listen(port);
	}

	REST.prototype.getServerInstance = function() {
		return server;
	}

	REST.prototype.get = function(url, callback) {
		server.get(url, function(req, res, next) {
			callback(req, res);
			return next();
		});
	}

	return REST;
})()