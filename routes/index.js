var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Site test de jums',
    message: 'Ceci est le site test de jumscrafteur'
  })
})

module.exports = router;