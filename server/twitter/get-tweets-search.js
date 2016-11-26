// var Twitter = require('twitter');
// var _ = require('lodash');
import Twitter from 'twitter';
import _ from 'lodash';

export default function getTweets(topic, onTweet) {
// module.exports.getTweetsSearch = function (topic, onTweet) {

	var twitter = new Twitter({
		consumer_key: 'tUvbaZEeWH1pUh4N6HlT8l0kU',
		consumer_secret: 'WHs8fv9RcV5oIGjypTYhBLcdI1guRReY6FSavuyiPfjgRA4xFg',
		access_token_key: '25272547-QxDiYAWtq4fQFUM2WynmIByGUBNdbDDGvNMvb50Ji',
		access_token_secret: 'Mj2OEd71i0m8vN5lM1zsgDRVfk1yEt2oA3lpOB2f0h4M0'
	});

	twitter.get('search/tweets', {q: '@'+topic+' '+'#'+topic}, function(error, tweets, response) {

		_.each(tweets.statuses, function(tweet){

			onTweet(tweet.text);
		})
	});
}

// getTweets('Amazon', function(tweet) { console.log(tweet) });
