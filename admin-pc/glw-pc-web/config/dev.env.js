'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"https://test-web-service.guolaiwan.net"',
  // BASE_URL: '"http://192.168.0.135:9184"',
  BASE_SSO_URL: '"https://test-sso.guolaiwan.net"',
  BASE_CASHIER_URL: '"https://test-cashier-service.guolaiwan.net"',
  // BASE_CASHIER_URL: '"http://192.168.0.126:9183"',
})
