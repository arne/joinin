const Telegraf = require("telegraf");
const Koa = require("koa");
const koaBody = require("koa-body");
const pug = require("pug");
const path = require("path");
const views = require("koa-views");
const logger = require("koa-logger");
const apiToken = "594092629:AAFDaDXs0SWRkW2zBL3f5JvQVnybS4dJxA0";

const bot = new Telegraf(apiToken);

bot.command("image", ctx =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);
bot.on("text", ({ reply }) => reply("Hey there!"));

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook("https://uiwwoekviw.localtunnel.me/secret-path");

const app = new Koa();

app.use(
  views(__dirname + "/views", {
    map: {
      html: "pug"
    }
  })
);

const rootRouter = require(__dirname + "/routes/");
const botRouter = require(__dirname + "/routes/bot");

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(botRouter.routes());
app.use(botRouter.allowedMethods());

app.use(koaBody());
app.use(
  (ctx, next) =>
    ctx.method === "POST" || ctx.url === "/secret-path"
      ? bot.handleUpdate(ctx.request.body, ctx.response)
      : next()
);
app.listen(3000);

module.exports = app;
