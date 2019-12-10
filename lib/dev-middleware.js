const { micro } = require('@jamsite/jamsite')
const renderError = require('./render-error')

// todo: simulate micro-dev

module.exports = (handler) =>
  async (req, res) => {
    try {
      return await handler(req, res)
    } catch (err) {
      const renderedError = renderError(err)
      const statusCode = err.statusCode || err.status || 500
      micro.send(res, statusCode, renderedError)
      console.error(renderedError)
    }
  }
