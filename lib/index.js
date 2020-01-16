const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const JamsiteDev = require('./jamsite-dev')

module.exports.JamsiteDev = JamsiteDev

module.exports.start = function start (jamsiteDev) {
  const jamsiteHandler = getRequestHandler(jamsiteDev)
  const config = getConfig(jamsiteDev.config)

  jamsiteDev.start()
  bs.init(config.bs)
  micro(jamsiteHandler).listen(config.server)
  jamsiteDev.on('update', () => bs.reload())
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
