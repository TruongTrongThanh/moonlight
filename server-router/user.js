const express = require('express')
const router = express.Router()
const helper = require('../helper')
const nodemailer = require('nodemailer')

router.get('/test', async function (req, res) {
  res.send(await helper.getLocalIP())
})

router.post('/', async function (req, res) {
  try {
    const validated = await helper.validateUser(req.body)
    await global.db.collection('users').insertOne(validated)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: 't.moon2111@gmail.com',
        pass: '49269449'
      }
    })

    const activatedLink = `http://${await helper.getLocalIP()}/auth/email-confirm?id=${validated._id}`

    let mailOptions = {
      from: 'Moonlight <t.moon2111@gmail.com>',
      to: validated.email,
      subject: "Moonlight account's activation!",
      html: `
        Just a few steps away from completing your registration. <br/>
        Click the link below: <br/>
        <a href="${activatedLink}">${activatedLink}</a>
      `
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err)
    })

    res.status(201)
    res.send({
      username: validated.username,
      email: validated.email
    })
  }
  catch (err) {
    res.status(err.code || 500).send(err.message)
  }
})

module.exports = router