var fs = require('fs')
var path = require('path')
var parseAscii = require('parse-bmfont-ascii')
var parseBinary = require('parse-bmfont-binary')
var write = require('write-bmfont-binary')
var pack = require('./')
var test = require('tape')
var equal = require('buffer-equal')

var fonts = [
  './fnt/Lato-Regular-16.fnt',
  './fnt/Lato-Regular-24.fnt',
  './fnt/Lato-Regular-32.fnt',
  './fnt/Lato-Regular-64.fnt',
]

fonts = fonts.map(function(file) {
  var data = fs.readFileSync(path.join(__dirname, file), 'utf8')
  return parseAscii(data)
})

test('packs multiple BMFont files into a single binary buffer', function(t) {
    var buf = pack(fonts)
    var HEADER = new Buffer(['P', 'B', 'M', 'F'].map(function(c) {
      return c.charCodeAt(0)
    }))

    var first = write(fonts[0])

    t.equal(equal(buf.slice(0, 4), HEADER), true, 'header')
    t.equal(buf.readUInt8(4), 1, 'version')
    t.equal(buf.readInt16LE(5), fonts.length, 'count')
    t.equal(buf.readInt32LE(7), first.length, 'buffer size')

    var firstIdx = 11
    var firstChunk = buf.slice(firstIdx, firstIdx+first.length)
    t.equal(equal(firstChunk, first), true, 'chunk')

    var parsed = parseBinary(firstChunk)
    //the ASCII doesn't include outline=0 and will break deepEqual
    fonts[0].info.outline = 0
    t.deepEqual(parsed, fonts[0], 'matches JSON')
    t.end()
})