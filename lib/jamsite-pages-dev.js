const { JamsitePages } = require('@jamsite/jamsite')

const DATA_STATIC = JamsitePages.DATA_STATIC
const DATA_DYNAMIC = JamsitePages.DATA_DYNAMIC
const TPL_PAGE = JamsitePages.TPL_PAGE
const TPL_HELPER = JamsitePages.TPL_HELPER
const TPL_PARTIAL = JamsitePages.TPL_PARTIAL
const EVENT_UPDATE = 'update'

class JamsitePagesDev extends JamsitePages {
  defaultConfig () {
    const config = super.defaultConfig()
    config.chokidarOptions.persistent = true
    return config
  }

  bindWatcherEvents (watcher, type) {
    super.bindWatcherEvents(watcher, type)
    watcher
      .on('change', (filePath) => this.addFile(type, filePath))
      .on('unlink', (filePath) => this.unlinkFile(type, filePath))
  }

  unwatch () {
    this.watchers.forEach(watcher => watcher.close())
  }

  unlinkFile (type, filePath) {
    if (type === TPL_PAGE) {
      this.unlinkPageTemplate(filePath)
    } else if (type === TPL_PARTIAL) {
      this.unlinkPartial(filePath)
    } else if (type === TPL_HELPER) {
      this.unlinkHelper(filePath)
    } else if (type === DATA_STATIC) {
      this.unlinkDataStatic(filePath)
    } else if (type === DATA_DYNAMIC) {
      this.unlinkDataDynamic(filePath)
    } else {
      return
    }

    this.triggerUpdate(type, filePath)
  }

  unlinkDataStatic (filePath) {
    const name = this.filePathToAssetName(DATA_STATIC, filePath)
    this.dataContext.removeStatic(name)
    const absPath = this.absPath(DATA_STATIC, filePath)
    delete require.cache[require.resolve(absPath)]
    if (!this.ready) return
    this.initRouter()
  }

  unlinkDataDynamic (filePath) {
    const name = this.filePathToAssetName(DATA_DYNAMIC, filePath)
    this.dataContext.removeDynamic(name)
    const absPath = this.absPath(DATA_DYNAMIC, filePath)
    delete require.cache[require.resolve(absPath)]
    if (!this.ready) return
    this.initRouter()
  }

  unlinkPageTemplate (filePath) {
    const name = this.filePathToAssetName(TPL_PAGE, filePath)
    delete this.pageTemplatePromises[name]
    if (!this.ready) return
    this.initRouter()
  }

  unlinkPartial (filePath) {
    const name = this.filePathToAssetName(TPL_PARTIAL, filePath)
    this.handlebars.unregisterPartial(name)
  }

  unlinkHelper (filePath) {
    const name = this.filePathToAssetName(TPL_HELPER, filePath)
    this.handlebars.unregisterHelper(name)
    const absPath = this.absPath(TPL_HELPER, filePath)
    delete require.cache[require.resolve(absPath)]
  }

  triggerUpdate (type, filePath) {
    if (this.ready) {
      this.emit(EVENT_UPDATE, type, filePath)
    }
  }

  addPage (filePath) {
    super.addPage(filePath).then(() => {
      if (!this.ready) return
      this.initRouter()
      this.triggerUpdate(TPL_PAGE, filePath)
    })
  }

  addPartial (filePath) {
    super.addPartial(filePath)
    this.triggerUpdate(TPL_PARTIAL, filePath)
  }

  addDataStatic (filePath) {
    super.addDataStatic(filePath)
    if (!this.ready) return
    this.initRouter()
    this.triggerUpdate(DATA_STATIC, filePath)
  }

  addDataDynamic (filePath) {
    super.addDataDynamic(filePath)
    if (!this.ready) return
    this.initRouter()
    this.triggerUpdate(DATA_DYNAMIC, filePath)
  }

  addHelper (filePath) {
    super.addHelper(filePath)
    this.triggerUpdate(TPL_HELPER, filePath)
  }
}

JamsitePagesDev.EVENT_UPDATE = EVENT_UPDATE

module.exports = JamsitePagesDev
