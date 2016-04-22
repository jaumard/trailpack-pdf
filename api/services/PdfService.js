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

  _configurePage(settings, properties) {
    settings = settings || {}
    properties = properties || {}

    settings = _.defaultsDeep(settings, this.app.config.pdf.pageSettings)
    properties = _.defaultsDeep(properties, this.app.config.pdf.pageProperties)

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
      return Promise.all(pSettings).then(() => Promise.all(pProperties)).then(()=> page)
    })
  }

  /**
   * Generate a PDF from HTML
   * @param html to transform
   * @param path to save the final file
   * @param settings to pass to the page
   * @param properties to pass to the page
   * @returns Promise
   */
  generateFromHtml(html, path, settings, properties) {
    return this._configurePage(settings, properties).then(page => {
      return page.property('content', html).then(status => {
        return page.render(path).then(() => {
          page.close()
        })
      })
    })
  }

  /**
   * Generate a PDF from local Trails route
   * @param route object or path to transform
   * @param path to save the final file
   * @param settings to pass to the page
   * @param properties to pass to the page
   * @returns Promise
   */
  generateFromRoute(route, path, settings, properties) {
    const baseUrl = `http://localhost:${this.app.config.web.port}`
    if (_.isObject(route)) {
      return this.generateFromUrl(`${baseUrl}${route.path}`, path, settings, properties)
    }
    else {
      return this.generateFromUrl(`${baseUrl}${route}`, path, settings, properties)
    }
  }

  /**
   * Generate a PDF from URL
   * @param url to transform
   * @param path to save the final file
   * @param settings to pass to the page
   * @param properties to pass to the page
   * @returns {Promise.<T>}
   */
  generateFromUrl(url, path, settings, properties) {
    return this._configurePage(settings, properties).then(page => {
      return page.open(url).then(status => {
        return page.render(path).then(() => {
          page.close()
        })
      })
    })
  }
}

