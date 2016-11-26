import express from 'express'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import async from 'async'
import mustacheExpress from 'mustache-express'

//import socket from './socket-endpoint.js'
import scraperJS from './scraping/get-amazon-products.js';
import scrapeAmazon from './scraping/get-amazon-products.js';

//import getTone from './watson/get-tone.js';

var buffer = [];

//////////////////////////////////////////////////////////////////////////////
// Setup Express App
//////////////////////////////////////////////////////////////////////////////
let app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
var socket = require('socket.io-client')('http://localhost');
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
*/

app.set('port', (process.env.PORT || 8080))

// views is directory for all template files
app.set('views', path.resolve(__dirname, '../views'))
app.engine('html', mustacheExpress())
app.set('view engine', 'html')

// set up a public folder
app.use(express.static('public'))
// set up path to our babel polyfill
app.use('/scripts', express.static(__dirname + '/node_modules/babel-polyfill/dist/'))

// Make sure    express parses request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//////////////////////////////////////////////////////////////////////////////
// Setup Database
//////////////////////////////////////////////////////////////////////////////

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
app.dbUri = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/spytroll'


////////////////////////////////////////////////////////////////////////////////
// Mongoose Setup
////////////////////////////////////////////////////////////////////////////////

mongoose.Promise = global.Promise

/*
 * Function: connectToDatabase
 *
 * Makes connection asynchronously.  Mongoose will queue up database
 * operations and release them when the connection is complete.
 */
/*
app.connectToDatabase = function(done) {
    mongoose.connect(app.dbUri, function (err, res) {
        if (err) {
            console.log('ERROR connecting to: ' + app.dbUri + '. ' + err)
        } else {
            console.log('Succeeded connected to: ' + app.dbUri)
        }
        if (done) {
            done()
        }
    })
}*/

//////////////////////////////////////////////////////////////////////////////
// Load models
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// Define Routes
//////////////////////////////////////////////////////////////////////////////


// Automatically redirect all http traffic to https
if (process.env.NODE_ENV === 'production') {
    app.get('*', function(request, response, next) {
        if (request.get('X-Forwarded-Proto') !== 'https') {
            response.redirect('https://' + request.hostname + request.url)
        }
        else {
            next()
        }
    })
}

// resolve landing.html on /
app.get('/', function(request, response) {
    response.render('landing', {
        production: process.env.NODE_ENV === 'production',
    })
})

// Call to ScraperJS
app.get('/data', function(request, response) {
    var searchterm = request.param('searchterm');
    console.log( "Query: " + request.body );

    // Get the data from production env
    scrapeAmazon( searchterm,
                function( stuff ) { console.log( stuff ) },
                put2Socket );
    
    response.status(200).send("Searching: " + searchterm );
})

// Create for emitting
var put2Socket = function( name ) {
    // Add to buffer
    buffer.push( name );
}

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    // Send the buffered data
    client.on('event', function(data) {
        client.emit('broad', buffer);
    });

});

export default app