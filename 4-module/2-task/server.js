const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStreem = require('./LimitSizeStream');


const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      if ( pathname.indexOf('/')!== -1 ) {
        res.statusCode = 400;
        res.end('Вложенные папки не поддерживаются');
      } else {
        try {
          fs.accessSync(filepath);

          res.statusCode = 409;
          res.end('File already exists');
        } catch (err) {
          const stream = fs.createWriteStream(filepath);
          req.on('close', () => {
            if (req.aborted) {
              // npmconsole.log('Connection aborted');
              fs.unlinkSync(filepath);
              res.statusCode = 500;
              res.end('Сonnection aborted');
            }
          });

          req
              .pipe(new LimitSizeStreem({limit: 1000000}))
              .on('error', (err) => {
                // console.log(err.code, 'lalallal');
                fs.unlinkSync(filepath);
                res.statusCode = 413;
                res.end('File is very big');
              })
              .pipe(stream)
              .on('error', (err) => {
                console.log(err, 'error');
                res.statusCode = 500;
              });
          stream.on('close', () =>{
            res.statusCode = 201;
            res.end('closed');
          }
          );
        }
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
