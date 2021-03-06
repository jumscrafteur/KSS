﻿const mongoose = require("mongoose")

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 2
  },
  img: {
    data: Buffer,
    contentType: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("User", schema)