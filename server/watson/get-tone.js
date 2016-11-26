var _ = require('lodash');
var request = require('request');

function getTone(text) {

	console.log('doing stuff...');

	var data = { text: text };

	request.post({
		uri: 'http://spytroll.eu-gb.mybluemix.net/analyze-text',
		body: JSON.stringify(data)
	}, function(error, response, body){

		if(error) { console.log(error); }
		else { console.log(response.statusCode, body); }
	});

}

getTone('The fat black cat sat in the hat and shat.');