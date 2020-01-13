const { JamsitePages } = require('@jamsite/jamsite')

const EVENT_UPDATE = 'update'

class JamsitePagesDev extends JamsitePages {
  defaultConfig () {
    const config = super.defaultConfig()
    config.chokidarOptions.persistent = true
    return config
  }

  bindWatcher (watcher) {
    super.bindWatcher(watcher)
    watcher
      .on('change', (filePath) => this.plugins.callOnAddFile(filePath))
      .on('unlink', (filePath) => this.plugins.callOnRemoveFile(filePath))
  }

  triggerUpdate (filePath) {
    if (this.ready) {
      this.emit(EVENT_UPDATE, filePath)
    }
  }
}

JamsitePagesDev.EVENT_UPDATE = EVENT_UPDATE

module.exports = JamsitePagesDev
