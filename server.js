const app = require('./lib/app');
const pool = require('./lib/utils/pool');
const Twit = require('twit');

const PORT = process.env.PORT || 7890;

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY_HERE,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET_HERE,
  access_token: process.env.ACCESS_TOKEN_HERE,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET_HERE
});

const count = 10;
const count2 = 10;

T.get('statuses/user_timeline', { screen_name: 'mecookiemonster', count }, (err, data, response) => {
  const random = Math.floor(Math.random() * count);

  console.log(data[random].text);
});

T.get('statuses/user_timeline', { screen_name: 'realdonaldtrump', count2 }, (err, data, response) => {
  const random = Math.floor(Math.random() * count2);

  console.log(data[random].text);
});
