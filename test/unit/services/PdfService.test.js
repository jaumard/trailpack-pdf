/* global describe, it */
const assert = require('assert')

describe('PdfService', () => {
  it('should exist', () => {
    assert(global.app.api.services['PdfService'])
  })
})
