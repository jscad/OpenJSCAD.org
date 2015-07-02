/*
 * Blob.js
 * See https://developer.mozilla.org/en-US/docs/Web/API/Blob
 *
 * Node and Browserify Compatible
 * 
 * Copyright (c) 2015 by Z3 Dev (@zdev/www.z3dev.jp)
 * License: MIT License
 *
 * This implementation uses the Buffer class for all storage.
 * See https://nodejs.org/api/buffer.html
 *
 * URL.createObjectURL(blob);
 *
 * History:
 * 2015/07/02: 0.0.1: contributed to OpenJSCAD.org CLI openjscad
 */
 
(function(module) {
  var Blob = function(contents, options) {
  // make the optional options non-optional
    options = options || {};
  // number of bytes
    this.size = 0;       // contents, not allocation
  // media type
    this.type = '';
  // readability state (CLOSED: true, OPENED: false)
    this.isClosed = false;
  // encoding of given strings
    this.encoding = 'utf8';
  // storage
    this.buffer = null;
    this.length = 32e+6; // allocation, not contents

    if (!contents) return;
    if (!Array.isArray(contents)) return;

  // process options if any
    if (options.type) {
    // TBD if type contains any chars outside range U+0020 to U+007E, then set type to the empty string
    // Convert every character in type to lowercase
      this.type = options.type.toLowerCase();
    };
    if (options.endings) {
    // convert the EOL on strings
    }
    if (options.encoding) {
      this.encoding = options.encoding.toLowerCase();
    }
    if (options.length) {
      this.length = options.length;
    }

  // convert the contents (String, ArrayBufferView, ArrayBuffer, Blob)
    this.buffer = new Buffer(this.length);
    var index = 0;
    for (index = 0; index < contents.length; index++) {
        switch (typeof(contents[index])) {
          case 'string':
            wbytes = this.buffer.write(contents[index],this.size,this.encoding);
            this.size = this.size + wbytes;
            break;
          case 'object':
            object = contents[index]; // this should be a reference to an object
            if (Buffer.isBuffer(object)) {
            }
            if (object instanceof ArrayBuffer) {
              var view = new DataView(object);
              var bindex = 0;
              for (bindex = 0; bindex < object.byteLength; bindex++) {
                var xbyte = view.getUint8(bindex);
                wbytes = this.buffer.writeUInt8(xbyte,this.size,false);
                this.size++;
              }
            }
            break;
          default:
            break;
        }
    }
    return this;
  };

  Blob.prototype = {

    asBuffer: function() {
      return this.buffer.slice(0,this.size);
    },

    slice: function( start, end, type ) {
      start = start || 0;
      end   = end   || this.size;
      type  = type  || '';
      return new Blob();
    },

    close: function () {
           // if state of context objext is already CLOSED then return
             if (this.isClosed) return;
           // set the readbility state of the context object to CLOSED and remove storage
             this.isClosed = true;
           },

    toString: function() {
                return 'blob blob blob';
              }
  };

  module.Blob = Blob;

})(this);
