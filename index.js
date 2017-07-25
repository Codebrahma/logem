const winston = require('winston');
const Papertrail = require('winston-papertrail').Papertrail;
// Get app name from the main package.json
const package = require('root-require')('package.json');
const APP_NAME = package ? package.name : 'APP';

const HOST = process.env.LOG_SERVICE_HOST;
const PORT = process.env.LOG_SERVICE_PORT;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

/**
 * Returns string representation of current timestamp
 * example: `Jul 22 2017 17:00:00 GMT-0700 (PDT)`
 */
function _timestamp() {
  return new Date().toString();
}

/**
 * Returns the format of log to display based on
 * parameters: level, message
 */
function _logFormat(level, message) {
  // => [PID] info : Server running at 8080
  return '[' + process.pid + '] ' + level + ' : ' + message;
}

// Log configuration for local console
const consoleLogger = new winston.transports.Console({
  timestamp: _timestamp,
  colorize: true,
  level: LOG_LEVEL
});

// Transports represent types of logging to do.
// Console logs are default
const transports = [ consoleLogger ];

// If remote port and host are provided
// Set up the remote logging config
if (HOST && PORT) {
  // Log configuration for papertrail
  const remoteLogger = new Papertrail({
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    },
    level: LOG_LEVEL,
    colors: {
      debug: 'blue',
      info: 'green',
      error: 'red'
    },
    host: HOST,
    port: PORT,
    json: true,
    colorize: true,
    program: APP_NAME,
    logFormat: _logFormat
  });
  remoteLogger.exceptionsLevel = 'error';
  transports.push(remoteLogger);
}

module.exports = new winston.Logger({
  transports: transports
});
