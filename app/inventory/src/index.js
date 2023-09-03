const express = require("express");
const { databaseConnection } = require('./database');
const expressApp = require("./expressApp")
const dotenv = require('dotenv-flow')
const logger = require('./utils/logger');

// Environment
dotenv.config({
    node_env: process.env.NODE_ENV || 'dev',
})

const startServer = async() => {
    const app = express();
    // Database connection
    await databaseConnection()
    // Middleware and routes
    await expressApp(app);

    app.listen(process.env.PORT, () => {
        logger.info(`inventory service is listening to port ${process.env.PORT}`)
    })
    .on('error', (err) =>{
        logger.error(err)
        process.exit();
    })
}

startServer();