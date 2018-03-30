const Koa = require('koa');
const Pug = require('koa-pug');

const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mount = require('koa-mount');
const serve = require('koa-static');
const session = require('koa-session');
const serveSass = require('koa.sass');
const Bots = require('./db/bots.js');

const config = require('config');
const app = new Koa();
app.use(logger());

const bots=new Bots;
bots.run(config, app);

// sessions
app.keys = ['super-botnet-key'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
// require('./source/auth.js');
// app.use(passport.initialize());
// app.use(passport.session());

const pug = new Pug({
  viewPath: './views',
  basedir: './views',
});

pug.use(app);

app.use(
  serveSass({
    mountAt: '/css',
    src: './sass',
    dest: './.tmp/css',
    debug: true,
  })
);

app.use(mount('/public/js', serve('./public/js')));

const rootRouter = require(__dirname + '/routes/');
const setupRouter = require(__dirname + '/routes/setup');

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(setupRouter.routes());
app.use(setupRouter.allowedMethods());

app.use(koaBody());

app.listen(config.port);

module.exports = app;
