const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    image: String,
    audioUrl: String,
    type: String,
    genre: String,
    duration: String
})

module.exports = mongoose.model('Song', songSchema)