/* global describe, it */
const assert = require('assert')
const fs = require('fs')
const jade = require('jade')

describe('PdfService', () => {
  it('should exist', () => {
    assert(global.app.api.services['PdfService'])
  })

  it('should exist generate a google.pdf PDF', (done) => {
    const path = process.cwd() + '/test/google.pdf'
    global.app.services.PdfService.generateFromUrl('http://google.fr', path).then(status => {
      assert(fs.existsSync(path))
      done()
    }).catch(err => done(err))
  })

  it('should exist generate a PDF from local route', (done) => {
    const path = process.cwd() + '/test/local.pdf'
    global.app.services.PdfService.generateFromRoute('/', path).then(status => {
      assert(fs.existsSync(path))
      done()
    }).catch(err => done(err))
  })
  it('should exist generate a PDF from HTML', (done) => {
    const path = process.cwd() + '/test/html.pdf'
    const template = process.cwd() + '/test/views/index.html'
    const fn = jade.compile(fs.readFileSync(template))
    global.app.services.PdfService.generateFromHtml(fn(), path).then(status => {
      assert(fs.existsSync(path))
      done()
    }).catch(err => done(err))
  })
})
