# trailpack-pdf

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]



## Install
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-pdf
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-pdf`

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-pdf')
  ]
}
```

## Usage
This Trailpack expose a service to generate PDF, you can call it like this under controller/services/policies :

```
/** 
 * Generate PDF from a Trails route, or route path
 * You can override global page settings and properties, these params are optional
**/
this.app.services.PdfService.generateFromRoute('/', '/path/to/my/file.pdf', {javascriptEnabled: true}, {pageSize: {format: 'A4'})
.then(() => {
  //pdf generated
})
.catch(err => this.log.error(err))

/** 
 * Generate PDF from an URL
 * You can override global page settings and properties, these params are optional
**/
this.app.services.PdfService.generateFromUrl('http://google.fr', '/path/to/my/file.pdf', {javascriptEnabled: true}, {pageSize: {format: 'A4'})
.then(() => {
  //pdf generated
})
.catch(err => this.log.error(err))
```

[npm-image]: https://img.shields.io/npm/v/trailpack-pdf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-pdf
[ci-image]: https://img.shields.io/travis/jaumard/trailpack-pdf/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/jaumard/trailpack-pdf
[daviddm-image]: http://img.shields.io/david/jaumard/trailpack-pdf.svg?style=flat-square
[daviddm-url]: https://david-dm.org/jaumard/trailpack-pdf
[codeclimate-image]: https://img.shields.io/codeclimate/github/jaumard/trailpack-pdf.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jaumard/trailpack-pdf

