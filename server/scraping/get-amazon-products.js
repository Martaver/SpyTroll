const phantom = require('phantom');

(async function() {
	const instance = await phantom.create();
	const page = await instance.createPage();
	await page.on("onResourceRequested", function(requestData) {
		console.info('Requesting', requestData.url)
	});

	const status = await page.open('https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=ereader');
	console.log(status);

	const content = await page.property('content');
	console.log(content);

	await instance.exit();
}());