const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY_HERE,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET_HERE,
  access_token: process.env.ACCESS_TOKEN_HERE,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET_HERE
});

const count = 50;

async function getTweet(userName) {
  const { data } = await T.get('statuses/user_timeline', { screen_name: userName, count });
  const random = Math.floor(Math.random() * data.length);

  return data[random].text;
}

async function tweet(user1, user2) {

  const tweet1 = await getTweet(user1);
  const tweet2 = await getTweet(user2);

  const firstTweet = tweetProcessor(tweet1);
  const secondTweet = tweetProcessor(tweet2);
  const tweetLink = firstTweet.tweetLink ? firstTweet.tweetLink : secondTweet.tweetLink;

  console.log(firstTweet.tweetFirstHalf + ' ' + secondTweet.tweetSecondHalf + ' ' + tweetLink);

  return firstTweet.tweetFirstHalf + ' ' + secondTweet.tweetSecondHalf + ' ' + tweetLink;
}

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

  return { tweetFirstHalf, tweetSecondHalf, tweetLink };
}

async function mashupTweet(user1, user2) {
  const { data } = await tweet(user1, user2).then((post) => T.post('statuses/update', { status: post }));
  return data.text;
}

module.exports = mashupTweet;
