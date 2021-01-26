const mongoose = require('mongoose')

var afkSchema = mongoose.Schema({

_id: { type: String, required: true }, 
text: { type: String, required: true },
welcomemessage: { type: String, required: true },

});
module.exports = mongoose.model('afksetting', afkSchema)