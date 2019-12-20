#!/usr/bin/env NODE_ENV=development node
const { getRequestHandler, jamsiteServer } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const devMiddleware = require('../lib/dev-middleware')
const JamsitePagesDev = require('../lib/jamsite-pages-dev')
const config = require('../config')

const jamsite = new JamsitePagesDev(config.jamsite)
const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))

bs.init({
  proxy: `${config.server.host}:${config.server.devPort}`,
  middleware: false,
  open: false,
  notify: false,
  port: config.server.port
})

jamsiteServer(jamsiteDevHandler, {
  port: config.server.devPort,
  host: config.server.host
}).on('close', () => bs.exit())

jamsite.on('update', () => bs.reload())
