const Telegraf = require("telegraf");
const Koa = require("koa");
const koaBody = require("koa-body");
const apiToken = "594092629:AAH6p1t4f3ZDdlpLjERHDUq2YgKDw9UC_Ys";

const bot = new Telegraf(apiToken);

bot.command("image", ctx =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);
bot.on("text", ({ reply }) => reply("Hey there!"));

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook("https://uiwwoekviw.localtunnel.me/secret-path");

const app = new Koa();
app.use(koaBody());
app.use(
  (ctx, next) =>
    ctx.method === "POST" || ctx.url === "/secret-path"
      ? bot.handleUpdate(ctx.request.body, ctx.response)
      : next()
);
app.listen(3000);
