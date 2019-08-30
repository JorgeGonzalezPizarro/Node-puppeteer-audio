const morganLogger = require('morgan');

const LoggerStreamAdapter = require('../../../infrastructure/logger/LoggerStreamAdapter');

module.exports = ({ logger }) => {
  return morganLogger('dev', {
    stream: LoggerStreamAdapter.toStream(logger)
  });
};
