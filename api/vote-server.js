const express = require('express')
const app = express()
const PORT = 9001
const HOST = '0.0.0.0'

const moment = require('moment')

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})

var db
MongoClient.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  auth: {
    user: 'root',
    password: 'M3n17v11',
    authSource: 'admin'
  }
}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('machiseo_vote')
})

app.get('/testapi', (req, res) => {
  res.status(200).send("ok")
})
app.get('/vote/series', (req, res) => {
  db.collection('series').find().sort({ title: 1 }).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/vote/result/list', (req, res) => {
  db.collection('series_vote').find().sort({ $natural: -1 }).limit(100).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.put('/vote/series/score/add/:id', (req, res) => {
  db.collection('series').updateOne({ _id: new ObjectID(req.params.id) },
  { $inc:
    {
      score: 1
    }
  }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/vote/series/score', (req, res) => {
  db.collection('series').find().sort({ score: -1 }).limit(10).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/vote/series/add', (req, res) => {
  db.collection('series').insertOne(req.body, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})


app.post('/vote/last/ip', (req, res) => {
  console.log(req.body.ip)
  db.collection('series_vote').find({ "ip.ip": req.body.ip }).sort({ $natural: -1 }).limit(1).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/vote/add', (req, res) => {
  db.collection('ip_check').find({ ip: req.connection.remoteAddress }).toArray((err, result) => {
    if (err) throw err
    db.collection('series_vote').insertOne(
      {
        author: req.body.author,
        series: req.body.series,
        ip: req.body.ip,
        time: req.body.time
      }, (err, result) => {
      if (err) throw err
      res.status(200).send(result)
    })
  })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
