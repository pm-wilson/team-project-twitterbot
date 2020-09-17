const getTweet = require('../lib/utils/utils')

describe('twitterbot routes', () => {
  it('should pass', async() => {
    expect(await getTweet('mecookiemonster')).toEqual(expect.any(String));
  });
});
