const express = require('express')
const bcrypt = require("bcrypt")
const {
  getRssFeed,
  getUserData,
  render
} = require("../helpers")

const User = require("../models/User")

var router = express.Router();

router.use(async (req, res, next) => {
  req.userData = await getUserData({
    req: req
  })
  next()
});


router.get('/', async (req, res, next) => {
  try {
    let rssData = await getRssFeed({
      slice: true,
      sliceNumber: 3
    })
    render({
      req,
      res,
      pageTemplate: "index",
      title: "Index",
      rssData
    })
  } catch (e) {
    next(e)
  }
})

router.get('/sorties', async (req, res, next) => {
  try {
    let rssData = await getRssFeed()
    render({
      req,
      res,
      rssData,
      pageTemplate: "sorties",
      title: "Sorties"
    })
  } catch (e) {
    next(e)
  }
})

router.get('/team', async (req, res, next) => {
  render({
    req,
    res,
    pageTemplate: "team",
    title: "Team"
  })
})

router.get('/planning', async (req, res, next) => {
  render({
    req,
    res,
    pageTemplate: "planning",
    title: "Planning"
  })
})

router.get('/logIn', async (req, res, next) => {
  render({
    req,
    res,
    pageTemplate: "logIn",
    title: "connecter"
  })
})

router.get('/logOut', async (req, res, next) => {
  req.session.destroy()
  res.redirect("/")
})

router.get('/register', async (req, res, next) => {
  render({
    req,
    res,
    pageTemplate: "register",
    title: "S\'inscrire"
  })
})

router.post('/submitLogInForm', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const dbUser = await User.findOne({
      email
    })
    if (dbUser == null) return res.redirect('/logIn')
    bcrypt.compare(password, dbUser.password, async (err, result) => {
      if (result) {
        let user = {
          email,
          pseudo: dbUser.pseudo,
          level: dbUser.level
        }
        req.session.userData = user
        res.redirect("/")
      } else {
        res.redirect("/logIn")
      }
    });
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/XjP3Mxm')
})

router.get('/*', (req, res) => {
  render({
    req,
    res
  })
})




module.exports = router;