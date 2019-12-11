#!/usr/bin/env NODE_ENV=development node
const { getRequestHandler, jamsiteServer } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const devMiddleware = require('../lib/dev-middleware')
const JamsitePagesDev = require('../lib/jamsite-pages-dev')
const config = require('../config')

const jamsite = new JamsitePagesDev(config)
const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))

bs.init({
  proxy: `${config.host}:${config.devPort}`,
  middleware: false,
  open: false,
  notify: false,
  port: config.port
})

jamsiteServer(jamsiteDevHandler, {
  port: config.devPort,
  host: config.host
})

jamsite.on('update', () => bs.reload())
