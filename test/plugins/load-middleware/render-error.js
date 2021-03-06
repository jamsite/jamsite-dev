const test = require('ava')
const renderError = require('../../../lib/plugins/load-middleware/render-error')

test('renders error', (t) => {
  const msg = 'error message'
  const error = new Error(msg)
  t.assert(renderError(error).startsWith(`Error: ${msg}\n`))
})
