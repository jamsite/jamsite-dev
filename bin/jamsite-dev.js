#!/usr/bin/env node
const { micro } = require('@jamsite/jamsite')
const bs = require('browser-sync').create()
const config = require('@jamsite/jamsite/config')

const {
  jamsiteDevHandler,
  jamsite
} = require('../jamsite-dev-handler')

bs.init({
  proxy: 'localhost:3030',
  middleware: false,
  open: false,
  notify: false,
  port: config.port
})

micro(jamsiteDevHandler).listen(3030)
jamsite.on('update', () => bs.reload())
