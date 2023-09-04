const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    transports:
        new transports.Console({
        // level: process.env.LOG_LEVEL || 'info',
        format:format.combine(
            format.colorize(),
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.printf(info => `${info.level}: [${[info.timestamp]}] - ${info.message}`),
        )}),
});