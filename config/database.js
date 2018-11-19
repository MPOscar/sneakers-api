const path = require('path')
const dotEnvPath = path.resolve('.env')

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath })

module.exports = {
  development: {
    'url': process.env.DATABASE_URL,
    'dialect': 'mysql',
    'define': {
      'underscored': true
    }
  },
  test: {
    'url': process.env.DATABASE_URL_TEST,
    'dialect': 'mysql',
    'define': {
      'underscored': true
    }
  },
  staging: {
    'url': process.env.DATABASE_URL_STAGING,
    'dialect': 'mysql',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  },
  production: {
    'url': process.env.DATABASE_URL_PRODUCTION,
    'dialect': 'mysql',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  }
}
