var Fetch = require('whatwg-fetch');
var Reflux = require('reflux');


// the rootUrl includes the api key
var rootUrl = 'https://openexchangerates.org/api/latest.json?app_id=****** include your own api key *******';

module.exports = {
	get: function () {
		return fetch(rootUrl)
    	  .then(function(response) {
    	    return response.json()
    	  })
	}
};
