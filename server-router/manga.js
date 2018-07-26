const express = require('express')
const router = express.Router()
const helper = require('../helper')

router.post('/', global.upload.single('fileBinary'), async function (req, res) {
  try {
    const validated = await helper.validateManga(req.body, req.file.buffer)
    console.log(validated)
    await global.db.collection('mangas').insertOne(validated)
    res.sendStatus(200)
  }
  catch (err) {
    res.status(err.code || 500).send(err.message)
  }
})

module.exports = router