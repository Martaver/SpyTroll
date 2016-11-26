var scraperjs = require('scraperjs');
var _ = require('lodash');
//import scraperjs from 'scraperjs'


//A simple scraper,

scraperjs.StaticScraper.create('https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=ereader')

.scrape(function($) {
	var ulBrands = $("h2")
		//Find the h2 element with text 'Brand'
		.filter(function() { return $(this).text() == 'Brand'})

		//Select the next element, it will be the UL, list of brands (Companies).
		.map(function() { return $(this).next();})

		//Get the first element, it will be the single UL tag.
		.get()[0];

	return $(ulBrands)

		//Get the span in each li.
		.find('li a span')

		//Get the text element of each span, which will give us our list of brands.
		.map(function() { return $(this).text() });

})

.then(function(news) {

	//Save the company names here.
	console.log(news);
})