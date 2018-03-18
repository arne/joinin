const Router = require("koa-router");
const router = new Router();
const bots = require('../db/bots.js')

router.get("/", async (ctx, next) => {
  await ctx.render("index");
});

module.exports = router;
