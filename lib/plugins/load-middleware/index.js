const { micro } = require('@jamsite/jamsite')
const renderError = require('./render-error')
const log = require('micro-visualize')

module.exports.loadMiddleware = function loadMiddleware () {
  return function devMiddleware (handler) {
    return log(async (req, res) => {
      try {
        return await handler(req, res)
      } catch (err) {
        const renderedError = renderError(err)
        const statusCode = err.statusCode || err.status || 500

        micro.send(res, statusCode, renderedError)
        console.error(renderedError)
      }
    })
  }
}
