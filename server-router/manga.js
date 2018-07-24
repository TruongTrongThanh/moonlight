const express = require('express')
const router = express.Router()
const helper = require('../helper')

router.post('/', global.upload.single('fileBinary'), async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.file)
    res.sendStatus(200)
  }
  catch (err) {
    res.status(err.code || 500).send(err.message)
  }
})

module.exports = router