const app = require('./lib/app');
const pool = require('./lib/utils/pool');
const { mashupTweet } = require('./lib/utils/utils');


const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

setInterval(() => { mashupTweet('mecookiemonster', 'realdonaldtrump'); }, 1000 * 10);

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
