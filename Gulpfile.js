const { src, parallel, series, dest } = require('gulp')
const es = require('gulp-eslint')
const minify = require('gulp-minify')
const jl = require('gulp-json-lint');

exports.default = parallel(series(eslint, mini), jsonLint, pipeContent)
exports.compileJS = series(eslint, mini)
exports.lint = parallel(eslint, jsonLint)

function eslint () {
  return src(['background.js'])
    .pipe(es({fix: true}))
    .pipe(es.format())
    .pipe(es.failAfterError())
}

function mini () {
  return src(['background.js'])
    .pipe(minify({
      ext:{
        src:'.js',
        min:'.min.js'
      },
      noSource: true,
      preserveComments: 'some'
    }))
    .pipe(dest('./build/'))
}

function jsonLint () {
  return src('manifest.json')
    .pipe(jl())
    .pipe(jl.report('verbose'))
    .pipe(dest('./build/'))
}

function pipeContent () {
  return src(['LICENSE'])
    .pipe(dest('./build/'))
}