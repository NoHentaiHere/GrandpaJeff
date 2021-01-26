const mongoose = require('mongoose')

const welcomeSchema = mongoose.Schema({

_id: String,
channelId: String, 
text: String

})
module.exports = mongoose.model('welcomechannels', welcomeSchema)