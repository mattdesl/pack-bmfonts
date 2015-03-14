This is a custom format, ideal for packing many different bitmap font sizes/styles/etc into a single binary buffer. 

### header

The buffer has the header `P B M F` (Packed BMFont), followed by a uint8 describing the spec version number (currently 1). Then Int16LE to describe the number of BMFont files contained in this binary. 

### files

Each file represents a distinct [size and font](https://github.com/Jam3/load-bmfont/blob/master/json-spec.md). Each file chunk starts with a Int32LE, the size of the chunk, and then the chunk itself (as per BMFont binary file spec). 