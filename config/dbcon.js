const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connect ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDb server issue ${error}`)
    }
}

module.exports ={
    connectDB
}