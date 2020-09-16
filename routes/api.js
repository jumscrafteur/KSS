const express = require("express")
const bcrypt = require("bcrypt")
const {
  userValidationRules,
  validate,
} = require('./validator.js')

const router = express.Router()
const saltRounds = 10

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({
  storage: storage
});


const User = require("../models/User")
const Manga = require("../models/Manga")
const {
  isAdmin
} = require("../helpers/index.js")

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

router.post("/users", upload.single('img'), userValidationRules(), validate, async (req, res) => {
  const dbuser = await User.findOne({
    email: req.body.email
  })
  console.log(dbuser)
  if (dbuser) {
    res.redirect('/register')
  } else {
    bcrypt.hash(req.body.password1, saltRounds, async (err, hash) => {
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
        img: {
          data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
          contentType: 'image/png'
        },
        password: hash,
      })
      await user.save()
      req.session.userData = user
      res.redirect('/')
    })
  }
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

router.post("/users/delete", isAdmin, async (req, res) => {
  try {
    const dbUser = await User.findOne({
      email: req.session.userData.email
    })

    bcrypt.compare(req.body.password, dbUser.password, async (err, result) => {
      if (result) {
        await User.deleteOne({
          _id: req.body.toDeleteUser
        })
      }
      res.redirect("/pm")
    });
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
  // console.log(req.body, req.session.userData)
  // res.send(req.body)
})

router.delete("/users", isAdmin, async (req, res) => {
  console.log(req.body)
  // try {
  //   await User.deleteOne({
  //     _id: req.params.id
  //   })
  //   res.status(204).send()
  // } catch (e) {
  //   res.status(404)
  //   res.send({
  //     message: "User doesn't exist!",
  //     error: e
  //   })
  // }
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

router.delete("/mangas/:id", isAdmin, async (req, res) => {
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