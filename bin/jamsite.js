#!/usr/bin/env NODE_ENV=development node
const { getRequestHandler, jamsiteServer } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const jamsiteLogMiddleware = require('../lib/jamsite-log-middleware')
const autoloadBsMiddleware = require('../lib/autoload-bs-middleware')
const JamsitePagesDev = require('../lib/jamsite-pages-dev')
const config = require('../config')

;(async function(){
  const bsMiddleware = await autoloadBsMiddleware(config.jamsite)

  bs.init({
    proxy: `${config.server.host}:${config.server.devPort}`,
    middleware: bsMiddleware,
    open: false,
    notify: false,
    port: config.server.port
  })

  const jamsite = new JamsitePagesDev(config.jamsite)
  const jamsiteDevHandler = jamsiteLogMiddleware(getRequestHandler(jamsite))

  jamsiteServer(jamsiteDevHandler, {
    port: config.server.devPort,
    host: config.server.host
  }).on('close', () => bs.exit())

  jamsite.on('update', () => bs.reload())
})()
