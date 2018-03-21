exports.up = (pgm) => {
  pgm.addColumns( "bots", {
    description: "text"
  });
};

exports.down = (pgm) => {
  pgm.dropColumns( "bots", [ "description" ] );

};
