const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,   // always store hashed
    playlists: Array,
    likedSongs: Array,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)