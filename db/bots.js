const db = require('.');
const Telegraf = require('telegraf');


 /*
  * @class Bots
  */
class Bots {

  constructor() {
    this.bots=new Array;
  };
 /*
  * @return Promise
  */
 all() {
    return db.queryMany('SELECT * FROM bots');
  };
  /*
   * @param  {values}
   */
  create(values) {
    return db.queryOne(
      'INSERT INTO bots(name, api_key, owner_id, description) VALUES($1, $2, $3, $4) RETURNING id, name, api_key, owner_id, description',
      [values.name, values.api_key, values.owner_id, values.description]
    );
  };
  /*
   * @param  {} botId
   */
  get(botId) {
    return db.queryOne(
      'SELECT name, description, api_key FROM bots WHERE id=$1',
      [botId]
    );
  };
  /*
   * @param  {} botId
   * @param  {} eventId
   */
  getEvent(botId, eventId) {
    return db.queryOne(
      'SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2',
      [botId, eventId]
    );
  };
 /** V
  * @param  {} values
  */
  async run(config) {
    const bots = await this.all();
    for(const b of bots) {
      let bot = new Telegraf(b.api_key);
      bot.command('image', (ctx) =>
         ctx.replyWithPhoto({url: 'https://picsum.photos/200/300/?random'})
      );
      // Set telegram webhook
      // npm install -g localtunnel && lt --port 3000
      bot.telegram.setWebhook('https://zarjpfmohg.localtunnel.me/secret-path');
      bot.on('text', ({reply}) => reply('Hey there!'));
      this.bots[b.name]=bot;
    }
  };
  runHooks() {
    return (ctx, next) =>  {
      ctx.method === 'POST' && ctx.url === '/secret-path'
        ? bot.handleUpdate(ctx.request.body, ctx.response)
        : next()
    };
  };

};

module.exports = Bots;
