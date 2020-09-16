const fetch = require('node-fetch')
const xml2js = require('xml2js')

const getRssFeed = async (options = {}) => {
  let {
    dataUrl = "https://mangadex.org/rss/9KDNWuA7z683StEQGB2yqcgMxsnawR4Z/group_id/13463?h=0",
      slice = false,
      sliceNumber = 1
  } = options

  var rssFeed = await fetch(dataUrl)
  var str = await rssFeed.text()
  var result = await xml2js.parseStringPromise(str)
  rssData = result.rss.channel[0].item
  if (slice) rssData = rssData.slice(0, sliceNumber)
  sentData = []
  for (let i = 0; i < rssData.length; i++) {
    let data = rssData[i]
    let [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(data.mangaLink[0]) || [, "Il y a une erreur dans ce mangaId"]
    let [, titre, chapitre] = /((?:[^-]+))+ - (.+)/gm.exec(data.title[0]) || [, "Il y a une erreur dans ce titre", "Il y a une erreur dans ce chapitre"]
    let obj = {
      titre,
      chapitre,
      liens: data.link[0],
      mangaId,
      couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
    }
    sentData.push(obj)

  }
  return sentData
}

const getUserData = async (options = {}) => {
  let {
    req = {}
  } = options
  if (req.session.userData) {
    return req.session.userData

  } else {
    return null
  }
}

const render = (options = {}) => {
  let {
    req = {},
      res = {},
      pageTemplate = "error",
      title = "erreur",
      rssData = [],
      mangas = [],
      users = [],
      test = {}
  } = options

  return res.render(pageTemplate, {
    title,
    userData: req.session ? req.session.userData : null,
    rssData,
    mangas,
    users,
    test
  })
}

const isAdmin = (req, res, next) => {
  if (!req.session.userData || req.session.userData.level != 0) {
    res.render('error', {
      title: 'erreur',
      userData: req.session ? req.session.userData : null,
    })

  } else {
    next()
  }
}

module.exports = {
  getRssFeed,
  getUserData,
  render,
  isAdmin
}