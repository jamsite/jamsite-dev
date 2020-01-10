const config = require('@jamsite/jamsite/config')

const devPort = 3030
config.bs = {
  proxy: `${config.server.host}:${devPort}`,
  port: config.server.port,
  middleware: false,
  open: false,
  notify: false
}

config.server.port = devPort

module.exports = config
