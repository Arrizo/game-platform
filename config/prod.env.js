'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BUILD_ENV: '"'+process.env.BUILD_ENV+'"',
  IS_PRODUCTION: '"'+process.env.IS_PRODUCTION+'"'
}
