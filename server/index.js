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

app.get('/users/sub/:sub', (req, res) => {
  db.collection('users').find({ sub: req.params.sub }).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/users/create', (req, res) => {
  db.collection('users').insertOne(
    {
      sub: req.body.sub,
      name: req.body.name,
      nickname: req.body.nickname,
      email: req.body.email,
      picture: req.body.picture,
      updated_at: req.body.updated_at
    }, (err, result) => {
      if (err) throw err
      res.status(200).send(result)
    }
  )
})

app.put('/users/update/:id', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) }, 
    { $set: 
      { 
        sub: req.body.sub,
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        picture: req.body.picture,
        updated_at: req.body.updated_at
      }
    }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })  
})

app.get('/reviews', (req, res) => {
  /*db.collection('reviews').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })*/
  db.collection('reviews').aggregate([
    { $lookup:
      {
        from: 'users',
        localField: 'user_sub',
        foreignField: 'sub',
        as: 'user'
      }
    }
  ]).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/reviews/latest', (req, res) => {
  db.collection('reviews').aggregate([
    { $lookup:
      {
        from: 'users',
        localField: 'user_sub',
        foreignField: 'sub',
        as: 'user'
      }
    },{ $sort: { _id: -1 }}, { $limit: 1 }]).toArray((err, result) => {
      if (err) throw err
      res.status(200).send(result)
    })
})

app.post('/reviews/add', (req, res) => {
  db.collection('reviews').insertOne(
    {
      user_sub: req.body.user_sub,
      reviewText: req.body.reviewText,
      created: new Date(),
      updated: new Date(),
      recommend: req.body.recommend,
      like: 0,
      replyCount: 0
    }, (err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.put('/reviews/edit', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.body._id) }, 
    { $set: 
      { 
        reviewText:req.body.reviewText,
        recommend: req.body.recommend,
        updated: new Date()
      }
    }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.delete('/reviews/delete/:id', (req, res) => {
 db.collection('reviews').deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.put('/reviews/vote/:id', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) },
  { $inc:
    {
      like: 1
    }
  }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/reviews/replies/:review_id', (req, res) => {
  db.collection('review_replies').aggregate([
    {$match: { 'review_id': new ObjectID(req.params.review_id) }},
    {$lookup:
      {
        from: 'users',
        localField: 'user_sub',
        foreignField: 'sub',
        as: 'user'
      }
    }
  ]).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/reviews/reply/add', (req, res) => {
  db.collection('review_replies').insertOne(
    {
      replyText: req.body.replyText,
      user_sub: req.body.user_sub,
      review_id: new ObjectID(req.body.review_id),
      created: new Date(),
      updated: new Date()
    }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.put('/reviews/replyCount/add/:id', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) },
  { $inc:
    {
      replyCount: 1
    }
  }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.delete('/reviews/reply/delete/:id', (req, res) => {
  db.collection('review_replies').deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.put('/reviews/replyCount/del/:id', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) },
  { $inc:
    {
      replyCount: -1
    }
  }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.put('/reviews/reply/edit', (req, res) => {
  db.collection('review_replies').updateOne({ _id: new ObjectID(req.body._id) }, 
    { $set: 
      { 
        replyText:req.body.replyText,
        updated: new Date()
      }
    }, (err, result) => {
    if (err) console.log(err)
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

