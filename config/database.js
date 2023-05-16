const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('connect', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', function (error) {
    console.log(error)
})