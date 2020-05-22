const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  number: {type: String, reguired: true}
})

const Phone = mongoose.model('Phone', phoneSchema)

module.exports = Phone
