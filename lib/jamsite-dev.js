const path = require('path')
const { Jamsite } = require('@jamsite/jamsite')

const EVENT_UPDATE = 'update'

class JamsiteDev extends Jamsite {
  initConfig (sitePath) {
    const config = super.initConfig(sitePath)
    config.watcher.persistent = true
    return config
  }

  initPlugins () {
    const plugins = super.initPlugins()
    plugins.loadPluginsFromDir(path.join(__dirname, 'plugins'))
    return plugins
  }

  bindWatcher () {
    super.bindWatcher()
      .on('change', (filePath) => this.plugins.callOnAddFile(filePath))
      .on('unlink', (filePath) => this.plugins.callOnRemoveFile(filePath))
  }

  triggerUpdate (filePath) {
    if (this.ready) {
      this.emit(EVENT_UPDATE, filePath)
    }
  }
}

JamsiteDev.EVENT_UPDATE = EVENT_UPDATE

module.exports = JamsiteDev
