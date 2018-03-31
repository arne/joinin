const Router = require('koa-router');
const router = new Router({prefix: '/setup'});

router.get('/', async (ctx, next) => {
  await ctx.render('setup');
});

module.exports = router;
