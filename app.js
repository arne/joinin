const Koa = require('koa');
const Telegraf = require('telegraf');
const Pug = require('koa-pug');

const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mount = require('koa-mount');
const serve = require('koa-static');
const session = require('koa-session');
const passport = require('koa-passport');
const serveSass = require('koa.sass');

const config = require('config');
const bot = new Telegraf(config.apiToken);

bot.command('image', (ctx) =>
  ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' })
);
bot.on('text', ({ reply }) => reply('Hey there!'));

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://zarjpfmohg.localtunnel.me/secret-path');

const app = new Koa();

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
app.use(
  (ctx, next) =>
    ctx.method === 'POST' || ctx.url === '/secret-path'
      ? bot.handleUpdate(ctx.request.body, ctx.response)
      : next()
);

app.listen(3000);

module.exports = app;
