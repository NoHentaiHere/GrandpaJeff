const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({
_id: String,
channelId: String,
text: String,
    
})
module.exports = mongoose.model('leave-channels', leaveSchema)