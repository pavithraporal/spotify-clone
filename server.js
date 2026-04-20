require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Song = require('./models/Song')
const Artist = require('./models/Artist')
const User = require('./models/User')

const app = express()
app.get('/hello', (req, res) => res.send('hello'))
// app.get('/test', (req, res) => res.send('WORKING'))

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
    ssl: true
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err))

app.get('/api/trending', async (req, res) => {
    try {
        const songs = await Song.find({ type: 'trending' })
        res.json(songs)
    } catch (err) {
        res.status(500).json([])
    }
})


app.get('/api/artists', async (req, res) => {
    try {
        const artists = await Artist.find({})
        res.json(artists)
    } catch (err) {
        res.status(500).json([])
    }
    
})

app.get('/api/albums', async (req, res) => {
    try {
        const albums = await Song.find({ type: 'album' })
        res.json(albums)
    } catch (err) {
        res.status(500).json([])
    }
})

app.get('/api/radio', async (req, res) => {
    try {
        const radio = await Song.find({ type: 'radio' })
        res.json(radio)
    } catch (err) {
        res.status(500).json([])
    }
})

app.get('/api/charts', async (req, res) => {
    try {
        const charts = await Song.find({ type: 'chart' })
        res.json(charts)
    } catch (err) {
        res.status(500).json([])
    }
})

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ message: 'User already exists' })
            const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashed })
        res.json({ message: 'Account created successfully!' })
    } catch (err) {
        res.status(500).json({ message: 'Error creating account' })
    }
})

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })
        const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Wrong password' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token, username: user.username, userId: user._id })
})



app.get('/api/search', async (req, res) => {
    try {
        const q = req.query.q
        if (!q) return res.json([])
        const results = await Song.find({
    $or: [
        { title: { $regex: q, $options: 'i' } },
        { artist: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } }
            ]
        })
        res.json(results)
    } catch (err) {
        console.error('Search error:', err)
        res.status(500).json([])
    }
})
// Get user playlists
app.get('/api/playlists/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user.playlists)
})

// Create playlist
app.post('/api/playlists', async (req, res) => {
    const { name, userId } = req.body
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.playlists.push({ name, songs: [] })
    await user.save()
    res.json({ message: 'Playlist created!', playlists: user.playlists })
})

// Add song to playlist
app.post('/api/playlists/addsong', async (req, res) => {
    const { userId, playlistName, song } = req.body
    const user = await User.findById(userId)
    const playlist = user.playlists.find(p => p.name === playlistName)
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' })
    playlist.songs.push(song)
    await user.save()
    res.json({ message: 'Song added!' })
})

app.use(express.static(__dirname))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/spotify.html')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

// app.listen(4000, () => {
    //     console.log('Server running on port 4000')
    // })