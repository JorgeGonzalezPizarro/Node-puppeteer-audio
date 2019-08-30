
module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 4000,
  timezone: process.env.TIMEZONE,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false,
    appenders: {
      out:{ type: 'console' },
      app:{ type: 'file', filename: 'logs/site.log' }
    },
    categories: {
      default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
  },
  authSecret: process.env.SECRET,
  authSession: {
    session: false
  }
}
