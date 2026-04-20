require('dotenv').config()
const mongoose = require('mongoose')
const Song = require('./models/Song')

mongoose.connect(process.env.MONGODB_URL, { family: 4, ssl: true })
.then(async () => {
    console.log('DB Connected!')
    const results = await Song.find({ title: /Ranjha/i })
    console.log('Count:', results.length)
    console.log('Results:', JSON.stringify(results))
    mongoose.connection.close()
})
.catch(err => console.log('DB Error:', err))