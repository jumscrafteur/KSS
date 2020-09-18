const express = require('express')
const moment = require('moment')
const router = express.Router()
const {
  render,
  isAdmin
} = require("../helpers")

const User = require("../models/User")
const Manga = require("../models/Manga")
moment.locale('fr');

router.use(isAdmin);

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

router.get("/users/edit/:id", async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  })

  date = moment(user.createdAt).fromNow()
  user.date = date
  render({
    req,
    res,
    pageTemplate: "admin/edit",
    title: user.pseudo,
    toEditUser: user,
  })
})
module.exports = router;