const http = require('http')
const express = require('express')
const fs = require('fs')

const port = process.env.PORT || 5400
var app = express();

// DATA collect
var msg = require('./DATA/msg.json')

// DATA API request handlers
app.get('/api/msg', async (req, res, next) => {
    var msg = require('./DATA/msg.json')
    res.header('Access-Control-Allow-Origin', '*').json(msg).status(200).end()
})
app.get('/api/indice', async (req, res, next) => {
    var indice = require('./DATA/indice.json')
    res.header('Access-Control-Allow-Origin', '*').json(indice).status(200).end()

})

app.post('api/msg', async (req, res, next) => {

    res.status(200).end()
})

// Server stuff
var server = http.createServer(app);
server.listen(port, () => console.log('Server running on port ' + port))
