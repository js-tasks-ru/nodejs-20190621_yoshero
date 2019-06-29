const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      console.log(pathname);
      if ( pathname.indexOf('/')!== -1 ) {
        res.statusCode = 400;
        res.end('Вложенные папки не поддерживаются');
      } else {
        const stream = fs.createReadStream(filepath);
        stream.on('error', (err) => {
          res.statusCode = 404;
          res.end('Not Found File');
          console.log( 'error;', err );
        });
        stream.pipe(res)
        stream.on('end', () => {
          console.log('File uploaded');
        });
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
