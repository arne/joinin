const passport = require('koa-passport');
const TelegramStrategy = require('passport-telegram-official').Strategy;
const config = require('config');
const users = require('../db/users');

const options = {};

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return users
    .findById(id)
    .then((person) => {
      done(null, person);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new TelegramStrategy(
    {
      botToken: config.apiToken,
    },
    function(profile, cb) {
      User.findOrCreate({ telegramId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    users
      .findByName(username)
      .then((person) => {
        console.log(person);
        if (!person) return done(null, false);
        if (!comparePass(password, person.password)) {
          return done(null, false);
        } else {
          return done(null, person);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);
