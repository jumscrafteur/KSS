const express = require('express')
const routes = require('./routes')
const app = express()
const path = require('path')
const port = process.env.port || 3000;


app.set("views", path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})