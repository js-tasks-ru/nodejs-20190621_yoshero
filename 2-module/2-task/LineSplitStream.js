const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.chunkTemp = '';
  }

  _transform(chunk, encoding, callback) {
    let data = chunk.toString();
    let index = data.indexOf(os.EOL);
    if (index === -1) {
      this.chunkTemp += chunk;
    } else {
      while (index !== -1) {
        const str = data.slice(0, index);
        data = data.slice(index + os.EOL.length);
        this.push(this.chunkTemp + str);
        index = data.indexOf(os.EOL);
        this.chunkTemp = data;
      }
    }
    callback();
  }

  _flush(callback) {
    this.push(this.chunkTemp);
    callback();
  }
}

module.exports = LineSplitStream;
