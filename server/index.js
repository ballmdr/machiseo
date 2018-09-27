const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

var db
MongoClient.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  auth: {
    user: 'root',
    password: 'M3n17v11'
  }
}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('machiseo')
})

app.get('/reviews', (req, res) => {
  db.collection('reviews').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.post('/reviews/add', (req, res) => {
  db.collection('reviews').insertOne(req.body, (err, result) => {
    console.log(req.body)
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.put('/reviews/edit', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.body._id) }, 
    { $set: 
      { 
        reviewText:req.body.reviewText 
      }
    }, (err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.delete('/reviews/delete/:id', (req, res) => {
 db.collection('reviews').deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.put('/reviews/vote/:id', (req, res) => {
  console.log(req.params.id)
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) },
  { $inc:
    {
      like: 1
    }
  }, (err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()

