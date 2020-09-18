const app = require('./lib/app');
const pool = require('./lib/utils/pool');
const { mashupTweet } = require('./lib/utils/utils');
const cors = require('cors');
const PORT = process.env.PORT || 7890;
app.use(cors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

setInterval(() => { mashupTweet('mecookiemonster', 'realdonaldtrump'); }, 1000 * 60 * 5);

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
