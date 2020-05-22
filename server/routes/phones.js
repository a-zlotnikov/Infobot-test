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

router.post('/', async function(req, res, next) {
  try {
    const newPhone =  new Phone({
      number: req.body.number
    })
    await newPhone.save()
    res.json({answer: 'ok'})
  } catch (e) {
  }
})

router.delete('/', async function(req, res, next) {
  try {
    const {number} = req.body
    await Phone.findOneAndDelete({number: number})
    await res.json({answer: 'ok'})
  } catch (e) {}
})

router.put('/', async function(req, res, next) {
  try {
    const {phone} = req.body
    console.log(phone)
    await Phone.findOneAndUpdate(phone.oldPhone, phone.newPhone)
    await res.json({answer: 'ok'})
  } catch(e) {}
})

module.exports = router
