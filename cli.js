#!/usr/bin/env node
var glob = require('glob')
var pack = require('./')
var load = require('load-bmfont')
var argv = require('minimist')(process.argv.slice(2))
var async = require('async')

if (argv._.length === 0) {
  console.error("Usage: pack-bmfonts *.fnt > Fonts.bin")
  process.exit(1)
}

//assume each entry is a glob
var entries = argv._

async.map(entries, glob, function(err, files) {
  if (err) {
    console.error("Error getting file globs")
    console.error(err.stack)
    process.exit(1)
  }

  files = files.reduce(function(prev, b) {
    return prev.concat(b)
  }, [])

  async.map(files, load, function(err, results) {
    if (err) {
      console.error("Error parsing font files")
      console.error(err.stack)
      process.exit(1)
    }
    process.stdout.write(pack(results))
  })
})
