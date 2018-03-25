const Router = require('koa-router');
const router = new Router();
const bots = require('../db/bots.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/b/:botid', async (ctx, next) => {
  const bot = await bots.get(ctx.params.botid);
  console.log(bot);
  ctx.assert(bot, 404, 'Bot not found');
  await ctx.render('bot/', { bot: bot });
});

router.get('/b/:botid/new', async (ctx, next) => {
  await ctx.render('bot/new');
});

router.post('/b/:botid/new', async (ctx, next) => {
  console.log(ctx.req);
});

router.get('/b/:botid/:eventid', async (ctx, next) => {
  const event = await bots.get_event(ctx.params.botid, ctx.params.eventid);
  ctx.assert(event, 404, 'Bot not found');
  await ctx.render('bot/event', { event: event });
});

module.exports = router;
