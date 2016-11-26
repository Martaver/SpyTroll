import express from 'express'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import async from 'async'
import mustacheExpress from 'mustache-express'

var io = require('socket.io');
import scraperJS from './scraping/get-amazon-products.js';
import scrapeAmazon from './scraping/get-amazon-products.js';

//////////////////////////////////////////////////////////////////////////////
// Setup Express App
//////////////////////////////////////////////////////////////////////////////
let app = express()
app.set('port', (process.env.PORT || 5000))

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
                put2Socket,
                put2Socket );
    
    response.status(200).send("ok");
})

// Create for emitting
var put2Socket = function( companyname ) {
    //io.sockets.emit( );
    console.log( companyname );
}


export default app