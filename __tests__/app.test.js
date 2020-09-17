const { tweetProcessor } = require('../lib/utils/utils')

describe.skip('twitterbot routes', () => {
  it('should pass', async() => {
    expect(await tweetProcessor('RT @me here is my cool tweet thing http:thisisalink')).toEqual({
      tweetFirstHalf: 'here is my', 
      tweetSecondHalf: 'cool tweet thing', 
      tweetLink: ['http:thisisalink']
    });
  });
});
