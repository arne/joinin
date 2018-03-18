const Router = require("koa-router");
const router = new Router({ prefix: "/bot" });

router.get("/", async (ctx, next) => {
  await ctx.render("setup.pug");
});

module.exports = router;
