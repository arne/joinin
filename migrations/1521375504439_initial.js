exports.up = (pgm) => {
  // TODO: figure out type shorthands
  pgm.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    telegram_id: 'text',
    name: 'text',
    created: { type: 'timestamp', notNull: true, default: 'now()' },
    modified: { type: 'timestamp', notNull: true, default: 'now()' },
  });
  pgm.createTable('bots', {
    id: { type: 'serial', primaryKey: true },
    name: 'text',
    api_key: 'text',
    owner_id: { type: 'integer', references: 'users' },
  });
  pgm.createTable('events', {
    id: { type: 'serial', primaryKey: true },
    title: 'text',
    start: { type: 'timestamp', notNull: true },
    end: { type: 'timestamp', notNull: true },
    created: { type: 'timestamp', notNull: true, default: 'now()' },
    bot_id: { type: 'integer', references: 'bots' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('events');
  pgm.dropTable('bots');
  pgm.dropTable('users');
};
