const config = require('@jamsite/jamsite/config')
config.server.devPort = config.server.port
config.server.port = config.server.port + 1
config.server.devHost = config.server.host
module.exports = config
