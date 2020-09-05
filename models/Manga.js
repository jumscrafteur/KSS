const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  chapters: [{
    type: mongoose.ObjectId
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model("Manga", schema)