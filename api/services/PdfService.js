'use strict'

const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module PdfService
 * @description Service to transform an URL to PDF
 */
module.exports = class PdfService extends Service {
  get phantom() {
    return this.app.packs.pdf.phantom
  }

  generateFromRoute(route, path, options) {
    if (_.isObject(route)) {
      //test
    }
    else {
      this.generateFromUrl(route, path, options)
    }
  }

  generateFromUrl(url, path, options) {
    phantom.createPage().then(page => {
      page.open(url).then(status => {
        page.render(path).then(() => {
          this.log.info('Page Rendered')

        })
      })
    })
  }
}

