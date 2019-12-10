#!/usr/bin/env node
const { micro, getRequestHandler } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const devMiddleware = require('../lib/dev-middleware')
const JamsitePagesDev = require('../lib/jamsite-pages-dev')
const config = require('../config')

const jamsite = new JamsitePagesDev(config)
const jamsiteDevHandler = devMiddleware(getRequestHandler(jamsite))

bs.init({
  proxy: `localhost:${config.devPort}`,
  middleware: false,
  open: false,
  notify: false,
  port: config.port
})

micro(jamsiteDevHandler).listen(config.devPort)
jamsite.on('update', () => bs.reload())
