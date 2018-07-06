const bcrypt = require('bcrypt')
const crypto = require('crypto')
const saltRounds = 10
const port = process.env.PORT || 8080

module.exports = {
  /**
   * @param {Object} req Request object (req.body or req.query).
   * @param {Array<String>} required Required list.
   * @returns {boolean} True if request contains all values in required list.
   */
  requestContains: function (req, required) {
    if (!req || !required) throw new Error('Require parameters.')
    const reqList = Object.getOwnPropertyNames(req)
    if (reqList.length === 0)
      return false
    return required.every(function (value) {
      return (reqList.indexOf(value) >= 0 && req[value] !== '')
    })
  },

  /**
   * Trim property of object's property.
   * @param obj Object has property typeof string.
   * @param {Array<String>} exclude Array of string. Keep value of these property's names.
   * @return Old object with trim property's values.
   */
  trimObject: function (obj, exclude = []) {
    let newObj = new Object
    for (let property in obj) {
      if (exclude.includes(property))
        newObj[property] = obj[property]
      else
        newObj[property] = obj[property].trim()
    }
    return newObj
  },

  /**
   * Lowercase property of object's property.
   * @param obj Object has property typeof string.
   * @param {Array<String>} exclude Array of string. Keep value of these property's names.
   * @return Old object with lowercase property's values.
   */
  lowercaseObject: function (obj, exclude = []) {
    let newObj = new Object
    for (let property in obj) {
      if (exclude.includes(property))
        newObj[property] = obj[property]
      else
        newObj[property] = obj[property].toLowerCase()
    }
    return newObj
  },

  /**
   * @param obj Any object.
   * @param {Array<String>} exclude Array of string. Keep value of these property's names.
   * @return Old object with only properties in exclude array.
   */
  cutObject: function (obj, exclude = []) {
    for (let property in obj) {
      if (!exclude.includes(property))
        delete obj[property]
    }
    return obj
  },

  /**
   * Checking username's existence in database.
   * @param value Username need to check.
   * @return True if already exist.
   */
  userExist: async function (value) {
    const user = await global.db.collection('users').findOne({
      username: value
    })
    if (user)
      return true
    else
      return false
  },

  /**
   * Checking email's existence in database.
   * @param value Email need to check.
   * @return True if already exist.
   */
  emailExist: async function (value) {
    const user = await global.db.collection('users').findOne({
      email: value
    })
    if (user)
      return true
    else
      return false
  },

  /**
   * Validate user registration.
   * @param req Request object (req.body or req.query).
   * @return User object in database format.
   */
  validateUser: async function (req) {
    let errors = {
      code: 400,
      message: []
    }

    const usernameMaxLength = 30
    const passwordMaxLength = 30
    const required = ['username', 'password']
    const shouldNotCut = ['username', 'email', 'password', 'passConfirm']
    const shouldNotTrim = ['password', 'passConfirm']
    const shouldNotLowercase = ['password', 'passConfirm']

    let finalReq = new Object

    // Check if form contains username and password.
    if (this.requestContains(req, required)) {

      // transform the form.
      const cutReq = this.cutObject(req, shouldNotCut)
      const trimReq = this.trimObject(cutReq, shouldNotTrim)
      finalReq = this.lowercaseObject(trimReq, shouldNotLowercase)

      // Validate username.
      if (finalReq.username.length > usernameMaxLength) {
        errors.message.push({ type: 'username', mess: `Username must be under ${usernameMaxLength} characters.` })

        if (await this.userExist(finalReq.username))
          errors.message.push({ type: 'username', mess: `This username has been used.` })
      }

      // Validate email if exists.
      if (finalReq.email !== '' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(finalReq.email)) {
        errors.message.push({ type: 'email', mess: 'Email is not valid.' })

        if (await this.emailExist(finalReq.email))
          errors.message.push({ type: 'email', mess: `This email has been used.` })
      }

      // Validate password.
      if (finalReq.password.length > passwordMaxLength) {
        errors.message.push({ type: 'password', mess: `Password must be under ${passwordMaxLength} characters.` })
        // Compare password and password confirmation.
        if (finalReq.password !== finalReq.passConfirm)
          errors.message.push({ type: 'passConfirm', mess: 'Password and password confirmation are not the same.' })
      }
    }
    else {
      // If form doesn't contain username or password, check which one is missing or both.
      if (!req.username || req.username === '')
        errors.message.push({ type: 'username', mess: 'Username is missing.' })
      if (!req.password || req.password === '')
        errors.message.push({ type: 'password', mess: 'Password is missing.' })
    }

    if (errors.message.length > 0) throw errors
    // Throwing point. If validation was success, execute below codes.

    finalReq.password = await this.hash(finalReq.password) // Hash the password.
    finalReq.isActivated = false // Set default property for email activation.

    // Delete unnecessary things.
    if (!finalReq.email) delete finalReq.email
    delete finalReq.passConfirm

    return finalReq
  },

  /**
   * Hashing string with 10 salt rounds.
   * @param {String} password String need to hash.
   * @return Hash strings.
   */
  hash: function (password) {
    return bcrypt.hash(password, saltRounds)
  },
  /**
   * Compare hash.
   * @param {String} password Original string.
   * @param {String} hash Hashed string.
   * @return True if is equal.
   */
  compareHash: function (password, hash) {
    return bcrypt.compare(password, hash)
  },

  /**
   * Generate access token for authentication.
   * @return Random 32 bytes hex string.
   */
  genAccessToken: function () {
    return crypto.randomBytes(32).toString('hex')
  },

  /**
   * Get local IP of current server.
   * @param includePort Set this false in case you don't want to include port.
   * @return {Promise<String>} Local IP Address. Return error's message if it's failed.
   */
  getLocalIP: function (includePort = true) {
    return new Promise((resolve, reject) => {
      require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        if (err) reject(err.message)
        if (includePort)
          resolve(add + ':' + port)
        else
          resolve(add)
      })
    })
  }
}