const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10

const User = require("../models/User")
const Manga = require("../models/Manga")

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id
    })
    res.send(user)
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.post("/users", async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if (req.body.level) {
      if (req.cookies.userData) {
        req.body.level = req.cookies.userData.level >= req.body.level ? req.body.level : req.cookies.userData.level
      } else {
        req.body.level = 0
      }
    }
    const user = new User({
      pseudo: req.body.pseudo,
      level: req.body.level,
      password: hash,
    })
    await user.save()
    res.send(user)
  });

})

router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id
    })

    if (req.body.pseudo) {
      user.pseudo = req.body.pseudo
    }

    if (req.body.password) {
      user.password = req.body.password
    }

    await user.save()
    res.send(user)
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.delete("/users/:id", async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    })
    res.status(204).send()
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.get("/mangas", async (req, res) => {
  const mangas = await Manga.find()
  res.send(mangas)
})

router.get("/mangas/:id", async (req, res, next) => {
  try {
    const manga = await Manga.findOne({
      _id: req.params.id
    })
    res.send(manga)
  } catch (e) {
    res.status(404)
    res.send({
      message: "Manga doesn't exist!",
      error: e
    })
  }
})

router.post("/mangas", async (req, res) => {
  const manga = new Manga({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    chapters: []
  })
  await manga.save()
  res.send(manga)

})

router.patch("/mangas/:id", async (req, res) => {
  try {
    const manga = await Manga.findOne({
      _id: req.params.id
    })

    if (req.body.name) {
      manga.name = req.body.name
    }

    if (req.body.imageUrl) {
      manga.imageUrl = req.body.imageUrl
    }

    await manga.save()
    res.send(manga)
  } catch (e) {
    res.status(404)
    res.send({
      message: "Manga doesn't exist!",
      error: e
    })
  }
})

router.delete("/mangas/:id", async (req, res) => {
  try {
    await Manga.deleteOne({
      _id: req.params.id
    })
    res.status(204).send()
  } catch (e) {
    res.status(404)
    res.send({
      message: "Manga doesn't exist!",
      error: e
    })
  }
})

module.exports = router