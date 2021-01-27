const mongoose = require('mongoose')
const lastFMSchema = mongoose.Schema({
  userID: { type: String, required: true },
  username: { type: String, required: true }
})

module.exports = mongoose.model('lastfm-data', lastFMSchema)