/**
 * PDF Configuration
 * (app.config.pdf)
 *
 * Configure the Web Server
 *
 * @see {@link https://github.com/jaumard/trailpack-pdf}
 */
module.exports = {
  /**
   * Phantom launch options
   */
  options: [],

  /**
   * Global page settings
   * Example : javascriptEnabled to enable/disable javascript support on the page, userAgent...
   */
  pageSettings: {},

  /**
   * Global page properties
   * Example : page size, header, footer...
   */
  pageProperties: {
    paperSize: (phantom) => {
      return {}
    }
  }
}

