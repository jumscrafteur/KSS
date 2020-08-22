var express = require('express');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    var rss = await fetch('https://mangadex.org/rss/GUp54sazNTkvCX9dYKtwerM28gEfPmBq/group_id/13463')
    var str = await rss.text()
    var result = await xml2js.parseStringPromise(str)
    rssData = result.rss.channel[0].item.slice(0, 3)
    sentData = []
    for (let i = 0; i < rssData.length; i++) {
      let data = rssData[i]
      let [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(data.mangaLink[0]) || [, "Il y a une erreur dans ce mangaId"]
      let [, titre, chapitre] = /([A-Za-z ,\?]+) - (.+)/gm.exec(data.title[0]) || [, "Il y a une erreur dans ce titre", "Il y a une erreur dans ce chapitre"]
      let obj = {
        titre,
        chapitre,
        liens: data.link[0],
        mangaId,
        couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
      }
      sentData.push(obj)

    }
    res.render('index', {
      title: 'Index',
      sentData
    })
  } catch (e) {
    next(e)
  }
})

router.get('/sorties', async (req, res, next) => {
  try {
    var rss = await fetch('https://mangadex.org/rss/GUp54sazNTkvCX9dYKtwerM28gEfPmBq/group_id/13463')
    var str = await rss.text()
    var result = await xml2js.parseStringPromise(str)
    rssData = result.rss.channel[0].item
    sentData = []
    for (let i = 0; i < rssData.length; i++) {
      let data = rssData[i]
      let [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(data.mangaLink[0]) || [, "Il y a une erreur dans ce mangaId"]
      let [, titre, chapitre] = /([A-Za-z ,\?]+) - (.+)/gm.exec(data.title[0]) || [, "Il y a une erreur dans ce titre", "Il y a une erreur dans ce chapitre"]
      let obj = {
        titre,
        chapitre,
        liens: data.link[0],
        mangaId,
        couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
      }
      sentData.push(obj)

    }
    res.render('sorties', {
      title: 'Sorties',
      sentData
    })
  } catch (e) {
    next(e)
  }

})

router.get('/team', async (req, res, next) => {
  res.render('team', {
    title: 'Team',
    sentData
  })
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/XjP3Mxm')
})




module.exports = router;