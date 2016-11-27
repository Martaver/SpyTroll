// var scraperjs = require('scraperjs');
// var _ = require('lodash');
// var uuid = require('uuid');
import scraperjs from 'scraperjs'
import _ from 'lodash'
import uuid from 'uuid'

function getBrandUrlFromSearch(search) {
	return 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='+search;
}

function getProductUrlFromBrandAndSearch (brand, search) {

	return 'https://www.amazon.com/gp/search/ref=sr_nr_p_89_5?fst=as%3Aoff&rh=i%3Aaps%2Ck%3Ae-reader%2Cp_89%3A'+brand+'&keywords='+search+'&ie=UTF8&qid=1480151129&rnid=2528832011'
}

export default function scrapeAmazon(search, newCompanyCallback, newProductCallback) {
// module.exports.getAmazonProducts = function(search, newCompanyCallback, newProductCallback) {

		function scrapeBrands($) {

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
				.map(function() { return $(this).text() })
		}

		function onScrapeBrandsComplete(brands) {

			_.each(_.take(brands, 10), function(brand){

				// For each brand, look up the products that that brand owns.
				var company = {
					id: uuid(),
					name: brand
				};

				newCompanyCallback(company);

				return scraperjs.StaticScraper

				//Create url request for the brand/search term.
					.create(getProductUrlFromBrandAndSearch(brand, search))

					//Find the h2 element of each item, and get each's text.
					.scrape(function($) {

						return $("div.s-item-container").map(function() { return {
							name: $(this).find('h2').text(),
							imageSrc: $(this).find('img.s-access-image').attr('src')
						} })
					})

					.then(function(infos) {

						_.each(_.take(infos, 4), function(info) {

							var product = {
								id: uuid(),
								name: info.name,
								companyId: company.id,
								imageSrc: info.imageSrc
							};

							newProductCallback(product);
						})
					});
			})
		}

		return scraperjs.StaticScraper.create(getBrandUrlFromSearch(search))

			.scrape(scrapeBrands)
			.then(onScrapeBrandsComplete)
}

// scrapeAmazon('e-reader', function(company) {
// 	console.log('Company: '+JSON.stringify(company));
// }, function(product) {
// 	console.log('Product: '+JSON.stringify(product));
// });

// var exports = module.exports = {
// 	getAmazonProducts: scrapeAmazon
// };