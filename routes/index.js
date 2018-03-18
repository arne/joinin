const Router = require("koa-router");
const router = new Router();
const bots = require("../db/bots.js");

router.get("/", async (ctx, next) => {
  await ctx.render("index");
});

router.get("/:botid", async (ctx, next) => {
  await ctx.render("bot/");
});

router.get("/:botid/new", async (ctx, next) => {
  await ctx.render("bot/new.pug");
});

module.exports = router;
