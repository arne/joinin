const Router = require('koa-router');
const router = new Router();
const bots = require('../db/bots.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/b/:botid', async (ctx, next) => {
  const bot=await bots.get(ctx.params.botid);
  ctx.assert(bot.rows[0], 404, 'Bot not found');
  await ctx.render('bot/', { bot: bot.rows[0] });
});

router.get('/b/:botid/new', async (ctx, next) => {
  await ctx.render('bot/new.pug');
});

router.post('/b/:botid/new', async (ctx, next) => {
  console.log(ctx.req)
});

router.get('/b/:botid/:eventid', async (ctx, next) => {
  const event=await bots.get_event(ctx.params.botid, ctx.params.eventid);
  ctx.assert(bot.rows[0], 404, 'Bot not found');
  await ctx.render('bot/event.pug');
});

module.exports = router;
