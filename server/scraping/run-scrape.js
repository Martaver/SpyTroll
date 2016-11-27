/**
 * Created by sebas_000 on 26/11/2016.
 */
// var _ = require('lodash');
// var amazon = require('./get-amazon-products.js');
// var twitter = require('../twitter/get-tweets-search');
// var watson = require('../watson/get-tone');
import _ from 'lodash'
import getAmazonProducts from './get-amazon-products'
import getTweetsSearch from '../twitter/get-tweets-search'
import getTone from '../watson/get-tone'

export default function runScrape(search, onCompany, onProduct, onToneUpdate) {
// function runScrape(search, onCompany, onProduct, onToneUpdate) {

    function onNewCompany(company){

        onCompany(company)

        function onTweet(tweet) {

            function onTone(tone) {

                let obj = tone.document_tone.tone_categories.filter(function (c) { return c.category_id == 'emotion_tone'})[0]

                function getTone(id){
                    return obj.tones.filter(function(tone) { return tone.tone_id == id})[0]
                }

                let emotion = {
                    anger: getTone('anger').score,
                    disgust: getTone('disgust').score,
                    fear: getTone('fear').score,
                    joy: getTone('joy').score,
                    sadness: getTone('sadness').score
                }

                if(!company.emotions) company.emotions = []

                company.emotions.push(emotion)

                let avg = {
                    anger: 0,
                    disgust: 0,
                    fear: 0,
                    joy: 0,
                    sadness: 0
                }

                _.each(company.emotions, function(emotion){
                    avg.anger += emotion.anger/company.emotions.length
                    avg.disgust += emotion.disgust/company.emotions.length
                    avg.fear += emotion.fear/company.emotions.length
                    avg.joy += emotion.joy/company.emotions.length
                    avg.sadness += emotion.sadness/company.emotions.length
                })

                company.emotionsAverage = avg

                // Get top 3.
                let list = [
                    {name: 'anger', score: avg.anger},
                    {name: 'disgust', score: avg.disgust},
                    {name: 'fear', score: avg.fear},
                    {name: 'joy', score: avg.joy},
                    {name: 'sadness', score: avg.sadness}
                ]

                let top3 = _(list).orderBy('score', 'desc').take(3).value()

                onToneUpdate({
                    companyId: company.id,
                    emotions: top3
                })
            }

			// watson.getTone(tweet, onTone)
            getTone(tweet, onTone)
        }

		// twitter.getTweetsSearch(company.name, onTweet);
        getTweetsSearch(company.name, onTweet)
    }

    function onNewProduct(product) {
        onProduct(product)
    }


    // amazon.getAmazonProducts(search, onNewCompany, onNewProduct)
    getAmazonProducts(search, onNewCompany, onNewProduct)
}

// function log(obj){ console.log(JSON.stringify(obj)); }
// runScrape('toilet paper', log, log, log);
