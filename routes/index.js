const Router = require('koa-router');
const router = new Router();
const bots = require('../db/bots.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/b/:botid', async (ctx, next) => {
  await ctx.render('bot/');
});

router.get('/b/:botid/new', async (ctx, next) => {
  await ctx.render('bot/new.pug');
});

router.get('/b/:botid/:eventid', async (ctx, next) => {
  await ctx.render('bot/event.pug');
});

module.exports = router;
