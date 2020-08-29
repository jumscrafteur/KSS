var express = require('express');

var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('admin/index', {
    title: 'Error'
  })
})

router.get('/sorties', async (req, res, next) => {
  try {
    var rss = await fetch(teamRssLink)
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
    title: 'Team'
  })
})

router.get('/planning', async (req, res, next) => {
  res.render('planning', {
    title: 'Planning'
  })
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/XjP3Mxm')
})

router.get('/*', (req, res) => {
  res.render('error', {
    title: 'Error'
  })
})




module.exports = router;