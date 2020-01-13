const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const JamsitePagesDev = require('./jamsite-pages-dev')

module.exports.start = function start () {
  const config = require('../config')
  const jamsite = new JamsitePagesDev(config.jamsite)
  const jamsiteHandler = getRequestHandler(jamsite)

  bs.init(config.bs)
  micro(jamsiteHandler).listen(config.server)
  jamsite.on('update', () => bs.reload())
}
