/* global describe, it */
const assert = require('assert')
const fs = require('fs')
const jade = require('jade')

describe('PdfService', () => {
  const tmp = process.cwd() + '/test/tmp/'
  it('should exist', () => {
    assert(global.app.api.services['PdfService'])
  })
  describe('should generate PDF', () => {
    it('should generate a google.pdf PDF', (done) => {
      const path = tmp + 'google.pdf'
      global.app.services.PdfService.generateFromUrl('http://google.fr', path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })

    it('should generate a PDF from local route', (done) => {
      const path = tmp + 'local.pdf'
      global.app.services.PdfService.generateFromRoute('/', path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })

    it('should generate a PDF from HTML', (done) => {
      const path = tmp + 'html.pdf'
      const template = process.cwd() + '/test/views/index.html'
      const fn = jade.compile(fs.readFileSync(template))
      global.app.services.PdfService.generateFromHtml(fn(), path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })
  })

  describe('should generate a JPEG', () => {
    it('should generate a google.jpeg PDF', (done) => {
      const path = tmp + 'google.jpeg'
      global.app.services.PdfService.generateFromUrl('http://google.fr', path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })

    it('should generate a JPEG from local route', (done) => {
      const path = process.cwd() + '/test/local.jpeg'
      global.app.services.PdfService.generateFromRoute('/', path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })

    it('should generate a JPEG from HTML', (done) => {
      const path = tmp + 'html.jpeg'
      const template = process.cwd() + '/test/views/index.html'
      const fn = jade.compile(fs.readFileSync(template))
      global.app.services.PdfService.generateFromHtml(fn(), path).then(status => {
        assert(fs.existsSync(path))
        done()
      }).catch(err => done(err))
    })
  })
})
