const mongoose = require('mongoose')
const logger = require('../utils/logger')

module.exports = async() => {
    const connectionString = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.DB_HOST}`
    try {
        const conct = await mongoose.connect(connectionString, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info(`Successfully connected to MongoDB with host : ${conct.connection.host}`)
    }catch(err) {
        logger.error('unable to connect with database')
        logger.error(`error: ${err.message}`)
        process.exit(1)
    }
}