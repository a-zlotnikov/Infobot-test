const express = require('express')
const router = express.Router()
const Phone = require('../models/Phone')

router.get('/', async function(req, res, next) {
  try {
    const result = await Phone.find({})
    await res.json({response: result})
  } catch (e) {
    await res.json({response: false})
  }
})

module.exports = router
