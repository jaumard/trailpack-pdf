'use strict'

const Trailpack = require('trailpack')
const phantom = require('phantom')

module.exports = class PdfTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {
    this.phantom = null
  }

  /**
   * TODO document method
   */
  initialize () {
    return new Promise((resolve, reject) => {
      phantom.create(this.app.config.pdf.options).then((instance) => {
        this.phantom = instance
        return resolve(instance)
      }).catch(reject)
    })
  }

  unload () {
    this.phantom.exit()
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

