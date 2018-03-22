const Router = require('koa-router');
const router = new Router({ prefix: '/setup' });
const bots = require('../db/bots.js');

router.get('/', async (ctx, next) => {
  await ctx.render('setup');
});

module.exports = router;
