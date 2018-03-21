exports.up = (pgm) => {
  pgm.createTable( "response_status", {
    id: { type: "serial", primaryKey: true },
    status: "text",
  });

  pgm.createTable( "event_responses", {
    id: { type: "serial", primaryKey: true },
    user_id: { type: "integer", references: "users"},
    event_id: { type: "integer", references: "events"},
    response_id: { type: "integer", references: "response_status"},
    created: { type: "timestamp", notNull: true, default: "now()" },
    modified: { type: "timestamp", notNull: true, default: "now()" },

  });

};

exports.down = (pgm) => {
  pgm.dropTable( "event_responses");
  pgm.dropTable( "response_status");

};
