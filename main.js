const express = require('express')
const MongoClient = require('mongodb').MongoClient
const routes = require('./routes')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 3000;

// const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@Cluster0-rmp3c.mongodb.net/test?retryWrites=true&w=majority`
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dnmds.mongodb.net/<dbname>?retryWrites=true&w=majority`

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('scans')

    app.set("views", path.resolve(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    app.use('/', routes);

    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
    })

  })
  .catch(error => {
    console.error(error)
  })