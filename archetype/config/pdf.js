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
  //options: ['--ignore-ssl-errors=yes', '--load-images=no'],

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
      return {
        format: 'A4',
        /*
         header: {
         height: "1.5cm",
         contents: phantom.callback(function (pageNum, numPages) {
         return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>"
         })
         },
         footer: {
         height: "1.5cm",
         contents: phantom.callback(function (pageNum, numPages) {
         return "<h1>Footer <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>"
         })
         }*/
      }
    }
  }
}

