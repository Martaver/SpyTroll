var _ = require('lodash');
var req = require('request');

// var unirest = require('unirest');

function getTone(text) {

	console.log('doing stuff...');

	// request('http://www.google.com', function (error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		console.log(body) // Show the HTML for the Google homepage.
	// 	}
	// })

	var data = { 'text': text };
	req({
		// url: 'http://spytroll.eu-gb.mybluemix.net/analyze-text',
		url: 'http://spytroll.eu-gb.mybluemix.net',
		method: 'POST',
		//Lets post the following key/values as form
		json: data
	}, function(error, response, body){

		if(error) { console.log(error); }
		else { console.log(response.statusCode, body); }
	});

	// unirest.post('http://spytroll.eu-gb.mybluemix.net/analyze-text')
	// .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
	// .send({ "text": "The fat black cat sat in the hat and shat." })
	// .end(function (response) {
	// 	console.log(response.body);
	// });
}

getTone('The fat black cat sat in the hat and shat.');