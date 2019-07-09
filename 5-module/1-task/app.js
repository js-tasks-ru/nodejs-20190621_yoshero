const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

// let message ='';
let subscribers = [];

const subscribe = ( ctx ) => {
  return new Promise( ( resolve, reject ) => {
    subscribers.push( resolve );

    ctx.res.on( 'close', function() {
      subscribers.splice(subscribers.indexOf(resolve), 1);
      reject( new Error( 'Connection Closed' ) );
    });
  });
};


router.get('/subscribe', async (ctx, next) => {
  // console.log(ctx.query);
  // if (ctx.body.publish) console.log(ctx.request.body);
  // ctx.body = ctx.request.body;
  // console.log('2222222',ctx.res)
  //   await new Promise((resolve) => {
  //       ctx.res('close', resolve);
  //   });

  await subscribe( ctx ).then( ( message ) => {
    ctx.body = message;
  } );
  // if (message !== '') {
  //   ctx.body = message;
  //   message = '';
  // }
});

router.post('/publish', async (ctx, next) => {
  if (!ctx.request.body.message ) {
    ctx.throw(400);
  }
  const message = ctx.request.body.message;

  subscribers.forEach( ( resolve ) => {
    resolve( message );
  } );

  subscribers = [];
  ctx.body = 'Отправлено';
});

router.post('/upload', async (ctx, next) => {
  const stream = fs.createWriteStream('file.txt');
  ctx.req.pipe(stream);


  await new Promise((resolve) => {
    stream.on('close', resolve);
  });
});


app.use(router.routes());

module.exports = app;
