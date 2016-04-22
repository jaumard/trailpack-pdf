# trailpack-pdf
:package: Trailpack to generate PDF from routes or templates for Trails.js project
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

This Trailpack is based on [phantomjs](http://phantomjs.org) and [phantomjs-node](https://github.com/amir20/phantomjs-node) to generate PDF. 

## Install
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-pdf
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-pdf`

## Configure
Load the trailpack to the main config
```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-pdf')
  ]
}
```

```js
// config/pdf.js
module.exports = {
  /**
   * Phantom launch options, default to empty
   */
  options: ['--ignore-ssl-errors=yes', '--load-images=no'],

  /**
   * Global page settings, default to empty
   * Example : javascriptEnabled to enable/disable javascript support on the page, userAgent...
   */
  pageSettings: {javascriptEnabled:true},

  /**
   * Global page properties, default to empty
   * Example : page size, header, footer...
   */
  pageProperties: {
    paperSize: (phantom) => {
      return {
        format: 'A4',
        header: {
          height: '1.5cm',
          contents: phantom.callback(function (pageNum, numPages) {
            return '<h1>Header <span style=\'float:right\'>' + pageNum + ' / ' + numPages + '</span></h1>'
          })
        },
        footer: {
          height: '1.5cm',
          contents: phantom.callback(function (pageNum, numPages) {
            return '<h1>Footer <span style=\'float:right\'>' + pageNum + ' / ' + numPages + '</span></h1>'
          })
        }
      }
    }
  }
}

```

## Usage
This Trailpack expose a service to generate PDF, you can call it like this under controller/services/policies :

### From route
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
```
### From URL
```
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

## Contributing
We love contributions! In order to be able to review your code efficiently,
please keep the following in mind:

1. Pull Requests (PRs) must include new and/or updated tests, and all tests [must pass](https://travis-ci.org/jaumard/trailpack-pdf).
2. Use `eslint`! See the `eslintConfig` in [package.json](https://github.com/jaumard/trailpack-pdf/blob/master/package.json).
3. Please [reference the relevant issue](https://github.com/blog/1506-closing-issues-via-pull-requests) in your Pull Request.

## License
[MIT](https://github.com/trailsjs/trailpack-pdf/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-pdf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-pdf
[ci-image]: https://img.shields.io/travis/jaumard/trailpack-pdf/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/jaumard/trailpack-pdf
[daviddm-image]: http://img.shields.io/david/jaumard/trailpack-pdf.svg?style=flat-square
[daviddm-url]: https://david-dm.org/jaumard/trailpack-pdf
[codeclimate-image]: https://img.shields.io/codeclimate/github/jaumard/trailpack-pdf.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jaumard/trailpack-pdf
