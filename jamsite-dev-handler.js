const { getRequestHandler } = require('@jamsite/jamsite')
const config = require('@jamsite/jamsite/config')
const devMiddleware = require('./lib/dev-middleware')
const JamsitePagesDev = require('./lib/jamsite-pages-dev')
const jamsite = new JamsitePagesDev(config)

const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))
module.exports = { jamsiteDevHandler, jamsite }
