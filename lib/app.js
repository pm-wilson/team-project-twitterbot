const express = require('express');
const app = express();
const mashupTweet = require('./utils/utils');

app.use(express.json());


app.post('/mashup', async(req, res) => {
  try {
    const mashup = await mashupTweet(req.query.acc1, req.query.acc2);
    res.json(mashup);
  } 
  catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', async(req, res) => {
  res.json('hello again');
  res.send('<div>hello world</div>');
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
