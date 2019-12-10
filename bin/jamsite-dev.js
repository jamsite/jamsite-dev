#!/usr/bin/env node
const { micro } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const config = require('../config')

const {
  jamsiteDevHandler,
  jamsite
} = require('../jamsite-dev-handler')

bs.init({
  proxy: `localhost:${config.devPort}`,
  middleware: false,
  open: false,
  notify: false,
  port: config.port
})

micro(jamsiteDevHandler).listen(config.devPort)
jamsite.on('update', () => bs.reload())
