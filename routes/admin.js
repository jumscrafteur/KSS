const express = require('express')
const moment = require('moment'); // require
const router = express.Router();
const {
  getRssFeed,
  getUserData,
  render
} = require("../helpers")
const User = require("../models/User")
const Manga = require("../models/Manga")
moment.locale('fr');

router.use(async (req, res, next) => {
  user = await getUserData({
    req
  })
  if (!(user || user != null)) {
    res.redirect('/')
  } else {
    if (user.level == 0) next()
    else res.redirect('/')
  }
});

router.get("/", async (req, res, next) => {

  const mangas = await Manga.find().sort([
    ['updatedAt', 'descending']
  ])


  for (let i = 0; i < mangas.length; i++) {
    date = moment(mangas[i].updatedAt).fromNow()
    mangas[i].date = date
  }


  const users = await User.find().sort([
    ['createdAt', 'descending']
  ]).limit(10)


  for (let i = 0; i < users.length; i++) {
    date = moment(users[i].createdAt).fromNow()
    users[i].date = date
  }

  render({
    req,
    res,
    pageTemplate: "admin/",
    title: "Admin Pannel",
    mangas,
    users
  })
})

module.exports = router;