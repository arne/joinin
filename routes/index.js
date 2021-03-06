const Router = require('koa-router');
const router = new Router();
const Bots = require('../db/bots.js');
const bots = new Bots();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/b/:botid', async (ctx, next) => {
  const bot = await bots.get(ctx.params.botid);
  ctx.assert(bot, 404, 'Bot not found');
  await ctx.render('bot/', {bot: bot});
});

router.get('/b/:botid/new', async (ctx, next) => {
  const bot = await bots.get(ctx.params.botid);
  ctx.assert(bot, 404, 'Bot not found');
  await ctx.render('bot/new', {bot: bot});
});

router.post('/b/:botid/new', async (ctx, next) => {
  const bot = await bots.get(ctx.params.botid);
  ctx.assert(bot, 404, 'Bot not found');
  console.log(ctx.req.params);
});

router.get('/b/:botid/:eventid', async (ctx, next) => {
  const event = await bots.get_event(ctx.params.botid, ctx.params.eventid);
  ctx.assert(event, 404, 'Bot not found');
  await ctx.render('bot/event', {event: event});
});

router.post('/webhook/:botid', async (ctx, next) => {
  const bot = ctx.bots[ctx.params.botid];
  ctx.assert(bot, 404, 'Bot not found');
  bot.handleUpdate(ctx.request.body, ctx.response);
});

module.exports = router;
