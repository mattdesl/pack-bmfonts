# pack-bmfonts

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Packs multiple BMFont files into a single binary buffer. 

```sh
pack-bmfonts fonts/*.{xml,fnt} > fonts/packed.bin
```

Loads ASCII (text), XML, binary, and JSON. Accepts multiple globs as entries. See the [spec](spec.md) for binary details, or [unpack-bmfonts](https://www.npmjs.com/package/unpack-bmfonts) to extract the data.

## See Also

See [text-modules](https://github.com/mattdesl/text-modules) for related modules.

## Usage

[![NPM](https://nodei.co/npm/pack-bmfonts.png)](https://www.npmjs.com/package/pack-bmfonts)

### CLI

```
Usage:
  pack-bmfonts globs
```

Accepts a glob or a list of globs, prints the packed binary to stdout.

### API

#### `buffer = pack(fonts)`

Packs the array of `fonts` (JSON objects) into a single Buffer.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/pack-bmfonts/blob/master/LICENSE.md) for details.
