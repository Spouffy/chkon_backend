const http = require('http')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const bp = require('body-parser')

const port = process.env.PORT || 5400
var app = express();

app.use(cors({
    cors:'http://localhost:5500'
}))

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/api', (req, res) => {

    var msg = JSON.parse(fs.readFileSync('./DATA/msg.json', {encoding:'utf-8'}, (err, data) => {
        return data;
    }))
    var indice = JSON.parse(fs.readFileSync('./DATA/indice.json', {encoding:'utf-8'}, (err, data) => {
        return data;
    }))
    var posts = JSON.parse(fs.readFileSync('./DATA/posts.json', {encoding:'utf-8'}, (err, data) => {
        return data;
    }))
    res.json([msg, indice, posts]).status(200).end()
})
app.get('/api/msg', async (req, res, next) => {
    var msg = require('./DATA/msg.json')
    res.header('Access-Control-Allow-Origin', '*').json(msg).status(200).end()
})
app.get('/api/indice', async (req, res, next) => {
    var indice = require('./DATA/indice.json')
    res.header('Access-Control-Allow-Origin', '*').json(indice).status(200).end()
})
app.get('/api/posts', (req, res) => {
    var posts = require('./DATA/posts.json')
    res.header('Access-Control-Allow-Origin', '*').json(posts).status(200).end()
})

app.post('/api/msg', (req, res) => {
    fs.readFile('./DATA/msg.json', {encoding:'utf-8'}, (err, data) => {
        var s = JSON.parse(data)
        d = s.concat(req.body)
        fs.writeFile('./DATA/msg.json', JSON.stringify(d), {encoding:'utf-8'}, (errr, dat) => {
        })
    })
    res.send('yes').end();
})

app.post('/api/post', (req, res) => {
    fs.readFile('./DATA/posts.json', {encoding:'utf-8'}, (err, data) => {
        var s = JSON.parse(data)
        d = s.concat(req.body)
        console.log(d);
        fs.writeFile('./DATA/posts.json', JSON.stringify(d), {encoding:'utf-8'}, (errr, dat) => {
        })
    })
    res.send('yes').end();
})
// Server stuff
var server = http.createServer(app);
server.listen(port, () => console.log('Server running on port ' + port))
