'use strict'

const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module PdfService
 * @description Service to transform an URL to PDF
 */
module.exports = class PdfService extends Service {
  get phantom() {
    return this.app ? this.app.packs.pdf.phantom : null
  }

  generateFromRoute(route, path, settings, properties) {
    const baseUrl = `http://localhost:${this.app.config.web.port}`
    if (_.isObject(route)) {
      return this.generateFromUrl(`${baseUrl}${route.path}`, path, settings, properties)
    }
    else {
      return this.generateFromUrl(`${baseUrl}${route}`, path, settings, properties)
    }
  }

  generateFromUrl(url, path, settings, properties) {
    settings = settings || {}
    properties = properties || {}

    settings = _.defaultsDeep(settings, this.app.config.pdf.pageSettings)
    properties = _.defaultsDeep(properties, this.app.config.pdf.pageProperties)

    //options = _.mergeDeep(this.app.config.pdf.options)
    return this.phantom.createPage().then(page => {
      const pSettings = []
      _.each(settings, (value, key) => {
        pSettings.push(page.setting(key, value))
      })
      const pProperties = []
      _.each(properties, (value, key) => {
        if (_.isFunction(value)) {
          value = value(this.phantom)
        }
        pSettings.push(page.property(key, value))
      })
      return Promise.all(pSettings).then(() => Promise.all(pProperties)).then(() => {
        return page.open(url).then(status => {
          return page.render(path).then(() => {
            page.close()
          })
        })
      })
    })
  }
}

