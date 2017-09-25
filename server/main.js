const session = require('koa-session');
const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');

const api = require('./source/api');

const app = new Koa();
const router = new Router();
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  //overwrite: true, * (boolean) can overwrite or not (default true) 
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

api(router);

// or use absolute paths
app.use(router.routes())
app.use(router.allowedMethods());

app.use(serve(__dirname + '../../client/public'));

app.listen(3000);

console.log('listening on port 3000');