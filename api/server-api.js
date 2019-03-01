const express = require('express')
const app = express()
const PORT = 9000
const HOST = '0.0.0.0'

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
  db = client.db('machiseo')
})

app.get('/testapi', (req, res) => {
  res.status(200).send("It's OK")
})

app.get('/series_hit', (req, res) => {
  db.collection('series_hit').find().sort({ rank: 1 }).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})
app.get('/admin/home/:name', (req, res) => {
  db.collection(req.params.name).find().sort({ rank: 1 }).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})
app.get('/admin/home/clear/:name', (req, res) => {
  db.collection(req.params.name).deleteMany({}, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})
app.post('/admin/home/save/:name', (req, res) => {
  db.collection(req.params.name).insertMany(req.body, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/series_hit/clear', (req, res) => {
  db.collection('series_hit').deleteMany({}, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})
app.post('/series_hit/save', (req, res) => {
  db.collection('series_hit').insertMany(req.body, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

/*************
 * Users Management
 */

app.get('/users/:user_id', (req, res) => {
  db.collection('users').find({ sub_id: req.params.user_id }).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/users/create', (req, res) => {
  db.collection('users').insertOne(
    {
      sub_id: req.body.sub_id,
      name: req.body.name,
      nickname: req.body.nickname,
      email: req.body.email,
      picture: req.body.picture,
      created_at: new Date(),
      updated_at: new Date()
    }, (err, result) => {
      if (err) throw err
      res.status(200).send(result)
    }
  )
})

app.put('/users/update/:_id', (req, res) => {
  db.collection('users').updateOne({ _id: new ObjectID(req.params._id) }, 
    { $set: 
      { 
        sub_id: req.body.sub_id,
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        picture: req.body.picture,
        updated_at: new Date()
      }
    }, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })  
})

/** end user management */

/** review begin */
app.get('/reviews/:nid', (req, res) => {
  db.collection('reviews').aggregate([
    { $match: { 'serie_id': req.params.nid, 'show': "1" }},
    { $lookup:
      {
        from: 'users',
        localField: 'sub_id',
        foreignField: 'sub_id',
        as: 'user'
      }
    }
  ]).toArray((err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.post('/reviews/create', (req, res) => {
  db.collection('reviews').insertOne(
    {
      serie_id: req.body.serie_id,
      sub_id: req.body.sub_id,
      review_text: req.body.review_text,
      score: req.body.score,
      tag: req.body.tag,
      like: 0,
      dislike: 0,
      reply: 0,
      created_at: new Date(),
      updated_at: new Date(),
      show: "1"
    }, (err, result) => {
    if (err) return console.log(err)
    res.status(200).send(result)
  })
})

app.get('/reviews/latest/:uuid', (req, res) => {
  db.collection('reviews').aggregate([
    { $match: { 'serie_uuid': req.params.uuid }},
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

app.put('/reviews/hide/:id', (req, res) => {
  db.collection('reviews').updateOne({ _id: new ObjectID(req.params.id) } ,
  { $set:
    {
      show: "0"
    }
  })
})

app.delete('/reviews/delete/:id', (req, res) => {
 db.collection('reviews').deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err
    db.collection('review_replies').deleteMany({ review_id: new ObjectID(req.params.id) }, (err, result) => {
      if (err) throw err
      res.status(200).send("Deleted")
    })
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

/** review end */

app.get('/reviews/replies/latest/:review_id', (req, res) => {
  db.collection('review_replies').aggregate([
    {$match: { 'review_id': new ObjectID(req.params.review_id) }},
    {$lookup:
      {
        from: 'users',
        localField: 'user_sub',
        foreignField: 'sub',
        as: 'user'
      }
    }, { $sort: { _id: -1 }}, { $limit: 1 }]).toArray((err, result) => {
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

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
