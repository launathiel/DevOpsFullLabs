const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api/member", require("./routes/member"));
}