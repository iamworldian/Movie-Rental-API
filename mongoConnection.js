const mongoose = require('mongoose')
const config = require('config')

let mongooseConnection = mongoose;
mongooseConnection.set('strictQuery', true);

const db = config.get('db')

mongooseConnection.connect(db)
    .then(() => console.log(`Connected to Mongodb ${db}`))
    .catch(err => console.log('Cound not connect to MongoDB ... ' , err))


module.exports = mongooseConnection

