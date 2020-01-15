const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const JamsiteDev = require('./jamsite-dev')

module.exports.start = function start (sitePath) {
  const jamsite = new JamsiteDev(sitePath)
  const jamsiteHandler = getRequestHandler(jamsite)
  const config = getConfig(jamsite.config)

  jamsite.start()
  bs.init(config.bs)
  micro(jamsiteHandler).listen(config.server)
  jamsite.on('update', () => bs.reload())
}

function getConfig (config) {
  const devPort = 3030
  config.bs = {
    proxy: `${config.server.host}:${devPort}`,
    port: config.server.port,
    middleware: false,
    open: false,
    notify: false
  }

  config.server.port = devPort
  return config
}
