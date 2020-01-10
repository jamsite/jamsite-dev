const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const devMiddleware = require('./dev-middleware')
const JamsitePagesDev = require('./jamsite-pages-dev')

module.exports.start = function start () {
  const config = require('../config')
  const jamsite = new JamsitePagesDev(config.jamsite)
  const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))

  bs.init(config.bs)
  micro(jamsiteDevHandler).listen(config.server)
  jamsite.on('update', () => bs.reload())
}
