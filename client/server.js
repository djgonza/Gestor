var express = require('express');
var server = express();

server.use(express.static('public'));

server.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function() {
	console.log('Listening on port 3000...');
});