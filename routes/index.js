var express = require('express');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Index'
  })
})

router.get('/chapitres', async (req, res) => {
  var test = await fetch('https://mangadex.org/rss/GUp54sazNTkvCX9dYKtwerM28gEfPmBq/group_id/13463')
  var str = await test.text()
  var result = await xml2js.parseStringPromise(str)
  rssData = result.rss.channel[0].item
  sentData = []
  for (let i = 0; i < rssData.length; i++) {
    item = rssData[i]
    var [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(item.mangaLink[0])
    var [, titre, chapitre] = /([A-Za-z ]+) - (.+)/gm.exec(item.title[0])
    var obj = {
      titre,
      chapitre,
      liens: item.link[0],
      mangaId,
      couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
    }
    sentData.push(obj)

  }
  res.render('chapitres', {
    title: 'Chapitres',
    sentData
  })
  // res.send('👌')
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/XjP3Mxm')
})



module.exports = router;