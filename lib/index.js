const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const devMiddleware = require('./dev-middleware')
const JamsitePagesDev = require('./jamsite-pages-dev')

module.exports.start = function start () {
  const config = require('../config')
  const jamsite = new JamsitePagesDev(config.jamsite)
  const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))

  bs.init({
    proxy: `${config.server.devHost}:${config.server.port}`,
    middleware: false,
    open: false,
    notify: false,
    port: config.server.devPort
  })

  micro(jamsiteDevHandler).listen(config.server.port, config.server.devHost)
  jamsite.on('update', () => bs.reload())
}
