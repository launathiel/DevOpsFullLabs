const { validSecret } = require('../utils');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
    const secret = req.header('token');
    if (!secret) {
        logger.debug('No Secret, Access denied. Please Specify Secret for Internal Call');
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'No Secret, Access denied. Please Specify Secret for Internal Call',
            success: false
        });
    }
    try {
        const isAuthorized = await validSecret(req);
        if(isAuthorized){
            return next();
        }else{
            logger.debug('Unauthorized, Invalid Secret');
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'Invalid Secret',
                success: false
            });
        }
    } catch (err) {
        logger.debug('Unauthorized, No Secret Specified for call');
        res.status(401).json({
            status: 'Unauthorized',
            message: 'Invalid Secret',
            success: false
        });
    }
}