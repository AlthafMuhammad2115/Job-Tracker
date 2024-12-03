const logger = require('../utils/logger.utils');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  // sent it to error.log file
  
  logger.error({
    message: message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    status:statusCode,
  });

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = { errorHandler };