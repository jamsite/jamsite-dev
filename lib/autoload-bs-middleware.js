const path = require('path')

module.exports = async function autoloadLocalMiddleware ({ root }, bs) {
  const middlewares = []

  if (localModuleExists(root, 'webpack-dev-middleware', 'webpack')) {
    middlewares.push(await loadWebpackMiddleware(root, bs))
  }

  if (localModuleExists(root, 'rollup')) {
    middlewares.push(await loadRollupMiddleware(root))
  }

  return middlewares
}

function localModuleExists (root, ...moduleNames) {
  for (const moduleName of moduleNames) {
    try {
      require.resolve(path.join(root, '..', 'node_modules', moduleName))
    } catch (e) {
      return false
    }
  }

  return true
}

async function loadWebpackMiddleware (root, bs) {
  const webpack = require(path.join(root, '..', 'node_modules', 'webpack'))
  const webpackMiddleware = require(path.join(root, '..', 'node_modules', 'webpack-dev-middleware'))

  const webpackConfig = require(path.join(root, '..', 'src', 'webpack.config.js'))
  const compiler = webpack(webpackConfig)

  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath || '/',
    stats: {
      colors: true,
      context: root
    }
  })

  return new Promise((resolve, reject) => {
    middleware.waitUntilValid(() => resolve(middleware))
  })
}

async function loadRollupMiddleware () {
  return (req, res, next) => next
}
