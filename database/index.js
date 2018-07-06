const mongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'thanhDB'

module.exports = new Promise((resolve, reject) => {
  mongoClient.connect(url, (err, client) => {
    if (err) reject(err)
    console.log('Connected.')
    resolve(client.db(dbName))
  })
})