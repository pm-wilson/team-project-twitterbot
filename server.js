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

async function getTweet(userName) {
  
  const { data } = await T.get('statuses/user_timeline', { screen_name: userName, count2 });
  const random = Math.floor(Math.random() * count2);

  // console.log('trump:',data[random].text);
  return data[random].text;
}
async function getTrumpTweet() {
  
  const { data } = await T.get('statuses/user_timeline', { screen_name: 'realdonaldtrump', count2 });
  const random = Math.floor(Math.random() * count2);

  console.log('trump:', data[random].text);
  return data[random].text;
}


async function getCookieTweet() {
  const { data } = await T.get('statuses/user_timeline', { screen_name: 'mecookiemonster', count2 });
  const random = Math.floor(Math.random() * count2);

  console.log('cookie:', data[random].text);
  return data[random].text;
}

async function tweet(user1, user2) {
  const tweet1 = await  getTweet(user1);
  const tweet2 = await getTweet(user2);
  return `${tweet1}  ${tweet2}`;
}

// const whatever = tweet();
// console.log(whatever);
async function mashupTweet(user1, user2) {
  tweet(user1, user2).then((whatever) => T.post('statuses/update', { status: whatever }, (err, data, response) => { console.log('mashupTweet', data.text); }));
}
  
// getTrumpTweet()


mashupTweet('mecookiemonster', 'realdonaldtrump');

// Promise.all([
//   getCookieTweet,
//   getTrumpTweet
// ]).then(maashupTweet)

// const maashupTweet = T.post('statuses/update', { status: values[0] + ' stuff' + values[1] }, (err, data, response) => { console.log(data.text) })
