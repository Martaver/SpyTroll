var scraperjs = require('scraperjs');


//A simple scraper,

scraperjs.StaticScraper.create('https://www.amazon.com/s/ref=sr_nr_p_89_5?fst=as%3Aoff&rh=i%3Aaps%2Ck%3Ae-reader%2Cp_89%3ASony&keywords=e-reader&ie=UTF8&qid=1480116541&rnid=2528832011')
	.scrape(function($) {
		return $("a h2").map(function() {
			return $(this).text();
		}).get();
	})
	.then(function(news) {
		console.log(news);
	})