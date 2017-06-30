//Import NodeJS library for making Twitter API calls
var Twitter = require('twitter');

//Enter Twitter API keys below for app-only authentication:
module.exports = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  bearer_token: ''
});

// If you are using user based authentication, uncomment and complete
// the below block instead:

// module.exports = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
