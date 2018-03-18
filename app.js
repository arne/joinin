const Koa = require("koa");
const Telegraf = require("telegraf");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const mount = require("koa-mount");
const path = require("path");
const pug = require("pug");
const router = require('koa-router')();
const sass = require("koa-sass");
const serve = require("koa-static");
const serveSass = require("koa.sass");
const views = require("koa-views");

const config = require("config");
const bot = new Telegraf(config.apiToken);

bot.command("image", ctx =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);
bot.on("text", ({ reply }) => reply("Hey there!"));

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook("https://zarjpfmohg.localtunnel.me/secret-path");

const app = new Koa();

app.use(
  views(__dirname + "/views", {
    map: {
      html: "pug"
    },
    extension: "pug"
  })
);

app.use(
  serveSass({
    mountAt: "/public/css",
    src: "./sass",
    dest: "./.tmp/stylesheets",
    debug: true
  })
);

app.use(mount("/public/js", serve("./public/js")));

const rootRouter = require(__dirname + "/routes/");
const setupRouter = require(__dirname + "/routes/setup");

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(setupRouter.routes());
app.use(setupRouter.allowedMethods());

app.use(koaBody());
app.use(
  (ctx, next) =>
    ctx.method === "POST" || ctx.url === "/secret-path"
      ? bot.handleUpdate(ctx.request.body, ctx.response)
      : next()
);

app.listen(3000);

module.exports = app;
