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

const count = 100;

async function getTweet(userName) {
  
  const { data } = await T.get('statuses/user_timeline', { screen_name: userName, count });
  const random = Math.floor(Math.random() * count);

  data.map(tweet => tweet.text)

  // console.log('trump:',data[random].text);
  return data[random].text;
}
// async function getTrumpTweet() {
  
//   const { data } = await T.get('statuses/user_timeline', { screen_name: 'realdonaldtrump', count });
//   const random = Math.floor(Math.random() * count);

//   console.log('trump:', data[random].text);
//   return data[random].text;
// }


// async function getCookieTweet() {
//   const { data } = await T.get('statuses/user_timeline', { screen_name: 'mecookiemonster', count });
//   const random = Math.floor(Math.random() * count);

//   console.log('cookie:', data[random].text);
//   return data[random].text;
// }

async function tweet(user1, user2) {
  const tweet1 = await getTweet(user1);
  const tweet2 = await getTweet(user2);

  const firstTweet = tweetProcessor(tweet1);
  const secondTweet = tweetProcessor(tweet2);
  let tweetLink = firstTweet.tweetLink ? firstTweet.tweetLink : secondTweet.tweetLink;
  // tweetLink = tweetLink ? tweetLink : 'https://cdn.shopify.com/s/files/1/2195/6819/files/b0b185764bc7551c8e985b37b9c2a8cd_large.jpg?v=1546685437'

  console.log(firstTweet.tweetFirstHalf + ' ' + secondTweet.tweetSecondHalf + ' ' + tweetLink);

  return firstTweet.tweetFirstHalf + ' ' + secondTweet.tweetSecondHalf + ' ' + tweetLink;
};

function tweetProcessor(tweet) {

  let tweetWords = tweet.split(' ');
  let tweetLink = '';

  if(tweetWords[0] === 'RT') {
    tweetWords = tweetWords.slice(2);
  }

  if(tweetWords[tweetWords.length - 1].startsWith('http')) {
    tweetLink = tweetWords.splice(-1);
  }

  const halfwayPoint = Math.floor(tweetWords.length / 2);
  const tweetFirstHalf = tweetWords.slice(0, halfwayPoint).join(' ');
  const tweetSecondHalf = tweetWords.slice(halfwayPoint).join(' ');

  return { tweetFirstHalf, tweetSecondHalf, tweetLink }
}


// const whatever = tweet();
// console.log(whatever);
async function mashupTweet(user1, user2) {
  tweet(user1, user2)
  .then((whatever) => T.post('statuses/update', { status: whatever }, (err, data, response) => { console.log('mashupTweet', data.text); }));
}
  
// getTrumpTweet()


mashupTweet('mecookiemonster', 'realdonaldtrump');

// Promise.all([
//   getCookieTweet,
//   getTrumpTweet
// ]).then(maashupTweet)

// const maashupTweet = T.post('statuses/update', { status: values[0] + ' stuff' + values[1] }, (err, data, response) => { console.log(data.text) })
