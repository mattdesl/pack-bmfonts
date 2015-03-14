var write = require('write-bmfont-binary')
var VERSION = 1
var HEADER = new Buffer([
  80, 66, 77, 70, VERSION
])

module.exports = function(fonts) {
  var count = new Buffer(2)
  count.writeInt16LE(fonts.length, 0)

  //wrap each buffer with a blockSize header
  var chunks = Buffer.concat(fonts.map(function(font) {
    var buffer = write(font)
    var size = new Buffer(4)
    size.writeInt32LE(buffer.length, 0)
    return Buffer.concat([
      size,
      buffer
    ])
  }))

  return Buffer.concat([
    HEADER,
    count,
    chunks
  ])
}