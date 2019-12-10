const PrettyError = require('pretty-error')
const pe = new PrettyError()
  .withoutColors()
  .appendStyle({
    'pretty-error': {
      marginLeft: 0
    }
  })

module.exports = (err) =>
  `<body><pre>${pe.render(err)}`
