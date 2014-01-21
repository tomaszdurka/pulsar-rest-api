#!/usr/bin/env node
var pulsar = require('../pulsar-rest-api.js');
var childProcess = require('child_process');
var optimist = require('optimist').default('log-dir', null);
var fs = require('fs');
var argv = optimist.argv;
var logDir = argv['log-dir'];
var sslKey = argv['ssl-key'];
var sslCert = argv['ssl-cert'];
var sslPfx = argv['ssl-pfx'];
var sslPassphrase = argv['ssl-passphrase'];


if (logDir) {
	utils.logProcessInto(process, logDir + '/pulsar-rest-api.log');
}

if (!process.send) {
	argv = optimist.default('port', '8001').argv;
	pulsarServer = new pulsar.Server(argv['port'], null);

	process.on('SIGTERM', function() {
		pulsarServer.cleanup();
		process.exit();
	});
}