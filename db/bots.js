const db = require('.');
const Telegraf = require('telegraf');
const {URL}=require('url');
const localtunnel = require('localtunnel');

 /**
  * @class Bots
  */
class Bots {
 /**
  * New bot class
  */
  constructor() {
    this.bots=[];
  }

/**
  * return all bots from db
  * @return {Promise} Promise contains array of sql rows
  */
 all() {
    return db.queryMany('SELECT * FROM bots');
  }

  /**
   * Create new bot
   * @param  {Object} values containing name, api_key, owner_id and description.
   * @return {Promise} inserted row
   */
  create(values) {
    return db.queryOne(
      'INSERT INTO bots(name, api_key, owner_id, description) VALUES'+
      '($1, $2, $3, $4) RETURNING id, name, api_key, owner_id, description',
      [values.name, values.api_key, values.owner_id, values.description]
    );
  }

  /**
   * Get specified bot
   * @param  {number} botId
   * @return {Promise} Containing Object with bot from db
   */
  get(botId) {
    return db.queryOne(
      'SELECT name, description, api_key FROM bots WHERE id=$1',
      [botId]
    );
  }

  /**
   * Get event from db
   * @param  {number} botId
   * @param  {number} eventId
   * @return {Promise<Object>} event title, start, end
   */
  getEvent(botId, eventId) {
    return db.queryOne(
      'SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2',
      [botId, eventId]
    );
  }

  /**
   * Populate this.bots with telegram bots
   *
   * @async
   * @param  {Object} config
   * @param  {Object} app
   */
  async run(config, app) {
    const bots = await this.all();
    let host=config.host;
    if (app.env === 'development') {
      const p=new Promise((fulfill, reject) => {
        localtunnel(config.port, function(err, tunnel) {
          if (err) return reject(err);
          fulfill(tunnel);
        });
      });
      try {
        const tunnel=await(p);
        host=new URL(tunnel.url).host;
      } catch (err) {
        console.log(err);
        return;
      };
    }

    for (const b of bots) {
      let bot = new Telegraf(b.api_key);
      bot.command('image', (ctx) => {
         ctx.replyWithPhoto({url: 'https://picsum.photos/200/300/?random'})
      }
      );
      // Set telegram webhook
      // npm install -g localtunnel && lt --port 3000
      bot.telegram.setWebhook('https://'+host+'/webhook/'+b.name);
      bot.on('text', ({reply}) => reply('Hey there!'));
      this.bots[b.name]=bot;
    }
    app.context.bots=this.bots;
    return;
  };
}

module.exports = Bots;
