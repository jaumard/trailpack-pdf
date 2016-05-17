'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {
      DefaultController: class DefaultController {
        home(req, res) {
          res.render('index')
        }
      }
    },
    services: {}
  },
  config: {
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('trailpack-express4'),
        require('trailpack-router'),
        require('../')
      ]
    },
    routes: [
      {
        path: '/',
        handler: 'DefaultController.home',
        method: 'GET'
      }
    ],
    web: {
      port: 3000,
      views: {
        engines: {
          html: 'pug'
        },
        path: 'test/views'
      }
    },
    pdf: {
      pageProperties: {
        paperSize: (phantom) => {
          return {
            format: 'A4'
          }
        }
      }
    }
  }
}, smokesignals.FailsafeConfig)


