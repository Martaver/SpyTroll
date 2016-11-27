import express from 'express'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import mustacheExpress from 'mustache-express'
import runScrape from './scraping/run-scrape'

import http from 'http'
import socketIo from 'socket.io'

let app = express()
let server = http.createServer(app)
let io = socketIo(server)

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

// resolve landing.html on /
app.get('/', function(request, response) {
    response.render('index', {
        production: process.env.NODE_ENV === 'production',
    })
})

// Call to ScraperJS
app.get('/data', function(request, response) {
    let searchterm = request.param('searchterm')
    // console.log( "Query: " + request.body )

    // Get the data from production env
    runScrape( searchterm,
        function(c) { io.emit('company', c)},
        function(p) { io.emit('action', {type: 'RECEIVE_PRODUCTS', data: p})},
        function(t) { io.emit('action', {type: 'RECEIVE_TONES', data: t})}
    )

    response.status(200).send("Searching: " + searchterm )
})

server.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})

io.on('connection', function(socket) {
    socket.on('action', (action) => {
        // console.log('actions over here')
        // console.log(action.type)
        switch(action.type) {
            case 'RECEIVE_COMPANIES':
                console.log('Got company: ', action.data)
                socket.emit('action', {type: 'RECEIVE_COMPANIES', data: action.data})
            case 'RECEIVE_PRODUCTS':
                console.log('Got product: ', action.data)
                socket.emit('action', {type: 'RECEIVE_PRODUCTS', data: action.data})
            case 'RECEIVE_TONES':
                console.log('Got tone: ', action.data)
                socket.emit('action', {type: 'RECEIVE_TONES', data: action.data})
            default:
                console.log('Default logging')
        }
    })
})
