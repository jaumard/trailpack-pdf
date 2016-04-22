/* global describe, it */
const assert = require('assert')
const fs = require('fs')


describe('PdfService', () => {
  it('should exist', () => {
    assert(global.app.api.services['PdfService'])
  })

  it('should exist generate a google.pdf PDF', (done) => {
    const path = process.cwd() + '/google.pdf'
    global.app.services.PdfService.generateFromUrl('http://google.fr', path).then(status => {
      assert(fs.existsSync(path))
      done()
    }).catch(err => done(err))
  })

  it('should exist generate a PDF from local route', (done) => {
    const path = process.cwd() + '/local.pdf'
    global.app.services.PdfService.generateFromRoute('/', path).then(status => {
      assert(fs.existsSync(path))
      done()
    }).catch(err => done(err))
  })
})
