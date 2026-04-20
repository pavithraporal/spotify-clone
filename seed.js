require('dotenv').config()
const mongoose = require('mongoose')
const Song = require('./models/Song')
const Artist = require('./models/Artist')

mongoose.connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
    ssl: true
})

const songs = [
    // ─── TRENDING ───
    { title: "Ranjha", artist: "Diljit Dosanjh", image: "Assets/trending songs/first.jpeg", audioUrl: "Assets/songs/ranjha.mp3", type: "trending", genre: "punjabi", duration: "3:45" },
    { title: "VOGUE", artist: "Guru Randhawa", image: "Assets/trending songs/second.jpeg", audioUrl: "Assets/songs/vogue.mp3", type: "trending", genre: "punjabi", duration: "3:20" },
    { title: "Majboor", artist: "Sheheryar Rehan", image: "Assets/trending songs/third.jpeg", audioUrl: "Assets/songs/majboor.mp3", type: "trending", genre: "urdu", duration: "4:10" },
    { title: "Moves", artist: "Shubh", image: "Assets/trending songs/fourth.jpeg", audioUrl: "Assets/songs/moves.mp3", type: "trending", genre: "punjabi", duration: "3:55" },
    { title: "Bheegi Bheegi", artist: "A.R.Rahman", image: "Assets/trending songs/fifth.jpeg", audioUrl: "Assets/songs/bheegi-bheegi.mp3", type: "trending", genre: "bollywood", duration: "4:30" },
    { title: "Pavazha Malli", artist: "Sai Abhyankkar", image: "Assets/trending songs/sixth.jpeg", audioUrl: "Assets/songs/pavazha-malli.mp3", type: "trending", genre: "tamil", duration: "3:15" },
    { title: "Dheema", artist: "Anirudh Ravichander", image: "Assets/trending songs/seveth.jpeg", audioUrl: "Assets/songs/dheema.mp3", type: "trending", genre: "tamil", duration: "3:40" },
    { title: "Ehsaas", artist: "Faheem Abdullah", image: "Assets/trending songs/eighth.jpeg", audioUrl: "Assets/songs/ehsaas.mp3", type: "trending", genre: "urdu", duration: "4:00" },

    // ─── ALBUMS ───
    { title: "Aashiqui 2", artist: "Mithoon", image: "Assets/popular albums/first.jpeg", audioUrl: "Assets/Songs/tum-hi-ho.mp3", type: "album", genre: "bollywood", duration: "4:20" },
    { title: "Yeh Jawaani Hai Deewani", artist: "Pritam", image: "Assets/popular albums/second.jpeg", audioUrl: "Assets/Songs/badtameez-dil.mp3", type: "album", genre: "bollywood", duration: "5:10" },
    { title: "Sanam Teri Kasam", artist: "Himesh Reshammiya", image: "Assets/popular albums/third.jpeg", audioUrl: "Assets/Songs/sanam-teri-kasam.mp3", type: "album", genre: "bollywood", duration: "4:45" },
    { title: "Finding Her", artist: "Kushagra", image: "Assets/popular albums/fourth.jpeg", audioUrl: "Assets/Songs/finding-her.mp3", type: "album", genre: "indie", duration: "3:30" },
    { title: "Young G.O.A.T", artist: "Cheema Y", image: "Assets/popular albums/fifth.jpeg", audioUrl: "Assets/Songs/young-goat.mp3", type: "album", genre: "punjabi", duration: "3:50" },
    { title: "Raanjhan", artist: "Sachet-Parampara", image: "Assets/popular albums/sixth.jpeg", audioUrl: "Assets/Songs/raanjhan.mp3", type: "album", genre: "bollywood", duration: "4:15" },
    { title: "Ultimate Love Songs", artist: "Arijit Singh", image: "Assets/popular albums/seventh.jpeg", audioUrl: "Assets/Songs/ultimate-love.mp3", type: "album", genre: "bollywood", duration: "4:55" },
    { title: "Making Memories", artist: "Karan Aujla", image: "Assets/popular albums/eighth.jpeg", audioUrl: "Assets/Songs/making-memories.mp3", type: "album", genre: "punjabi", duration: "3:25" },

    // ─── RADIO ───
    { title: "Radio Mirchi Mix", artist: "Various Artists", image: "Assets/popular radio/first.jpeg", audioUrl: "", type: "radio", genre: "bollywood", duration: "60:00" },
    { title: "Radio Zindagi Mix", artist: "Various Artists", image: "Assets/popular radio/second.jpeg", audioUrl: "", type: "radio", genre: "bollywood", duration: "60:00" },
    { title: "Radio City Mix", artist: "Various Artists", image: "Assets/popular radio/third.jpeg", audioUrl: "", type: "radio", genre: "bollywood", duration: "60:00" },
    { title: "Radio One Mix", artist: "Various Artists", image: "Assets/popular radio/fouth.jpeg", audioUrl: "", type: "radio", genre: "mixed", duration: "60:00" },
    { title: "Radio Nasha Mix", artist: "Various Artists", image: "Assets/popular radio/fifth.jpeg", audioUrl: "", type: "radio", genre: "bollywood", duration: "60:00" },
    { title: "Radio Bollywood Mix", artist: "Various Artists", image: "Assets/popular radio/sixth.jpeg", audioUrl: "", type: "radio", genre: "bollywood", duration: "60:00" },
    { title: "Radio Desi Mix", artist: "Various Artists", image: "Assets/popular radio/seveth.jpeg", audioUrl: "", type: "radio", genre: "punjabi", duration: "60:00" },
    { title: "Radio Masala Mix", artist: "Various Artists", image: "Assets/popular radio/eigth.jpeg", audioUrl: "", type: "radio", genre: "mixed", duration: "60:00" },

    // ─── CHARTS ───
    { title: "Top 50 - India", artist: "Various Artists", image: "Assets/featured charts/first.jpg", audioUrl: "", type: "chart", genre: "bollywood", duration: "varies" },
    { title: "Top 50 - Global", artist: "Various Artists", image: "Assets/featured charts/second.jpg", audioUrl: "", type: "chart", genre: "mixed", duration: "varies" },
    { title: "Top 50 - USA", artist: "Various Artists", image: "Assets/featured charts/third.jpg", audioUrl: "", type: "chart", genre: "pop", duration: "varies" },
    { title: "Top 50 - UK", artist: "Various Artists", image: "Assets/featured charts/fouth.jpg", audioUrl: "", type: "chart", genre: "pop", duration: "varies" },
    { title: "Top 50 - Australia", artist: "Various Artists", image: "Assets/featured charts/ffith.jpg", audioUrl: "", type: "chart", genre: "pop", duration: "varies" },
    { title: "Top 50 - Canada", artist: "Various Artists", image: "Assets/featured charts/sixth.jpg", audioUrl: "", type: "chart", genre: "pop", duration: "varies" },
]

const artists = [
    { name: "Pritam", image: "Assets/Popular artisits/first.jpeg" },
    { name: "A.R.Rahman", image: "Assets/Popular artisits/second.jpeg" },
    { name: "Arijit Singh", image: "Assets/Popular artisits/third.jpeg" },
    { name: "Sachin-Jigar", image: "Assets/Popular artisits/fourth.jpeg" },
    { name: "Vishal-Shekhar", image: "Assets/Popular artisits/fifth.jpeg" },
    { name: "Atif Aslam", image: "Assets/Popular artisits/sixth.jpeg" },
    { name: "Anirudh Ravichander", image: "Assets/Popular artisits/seveth.jpeg" },
    { name: "Udit Narayan", image: "Assets/Popular artisits/eighth.jpeg" },
]

async function seed() {
    await Song.deleteMany({})
    await Artist.deleteMany({})
    await Song.insertMany(songs)
    await Artist.insertMany(artists)
    console.log('✅ Database seeded successfully!')
    mongoose.connection.close()
}

seed()