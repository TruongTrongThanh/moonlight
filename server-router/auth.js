const express = require('express')
const router = express.Router()
const helper = require('../helper')

router.get('/email-confirm', async function(req, res) {
  if (!req.query.id) {
    let err = new Error('Id is missing.')
    return next(err)
  }
  try {
    console.log(req.query.id)
    let kq = await global.db.collection('users').updateOne(
      { _id: require('mongodb').ObjectID(req.query.id) }, 
      {
        $set: { isActivated: true }
      }
    )
    res.send(kq)
    return 
  }
  catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.get('/current-user', async function(req, res) {
  try {
    if (req.cookies.access_token) {
      const token = req.cookies.access_token
      const user = await global.db.collection('users').findOne(
        { accessToken: token }
      )
      if (user) {
        res.send({
          id: user._id,
          username: user.username,
          email: user.email,
          isActivated: user.isActivated
        })
        return
      }
    }
    res.sendStatus(401)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/login', async function(req, res) {
  try {
    if (!req.body.username || !req.body.password)
      throw {code: 400, message: 'Username or password are missing.'}
    
    const user = await global.db.collection('users').findOne({
      username: req.body.username
    })

    if (!user) throw {code: 400, message: 'username or password are wrong.'}

    const isRight = await helper.compareHash(req.body.password, user.password)
    if (!isRight) throw {code: 400, message: 'username or password are wrong.'}
    
    const token = helper.genAccessToken()

    await global.db.collection('users').updateOne(
      { username: user.username },
      { $set: { accessToken: token } }
    )

    //res.header('Set-Cookie', `access_token=${token}; ${req.body.remember ? 'Max-Age=31556926' : ''}; Domain=localhost; Path=/; HttpOnly`)
    let expiredTime = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    res.cookie('access_token', token, {
      expires: req.body.remember ? expiredTime : null,
      httpOnly: true,
      //domain: await helper.getLocalIP(),
      //path: '/'
    })
    res.send({
      username: user.username
    })
  }
  catch (err) {
    res.status(err.code || 500).send(err.message)
  }
})

router.post('/logout', async function(req, res) {
  try {
    res.clearCookie('access_token')
    res.sendStatus(200)
  }
  catch (err) {
    res.status(err.code || 500).send(err.message)
  }
})

module.exports = router