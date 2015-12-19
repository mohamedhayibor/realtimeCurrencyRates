// This is responsible for fetching our data from OpenExchange and storing our data

var Reflux = require('reflux');
var Api = require('./api');
var Actions = require('./actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	getRates: function () {
		return Api.get()
			.then(function (json) {
				this.rates = json.rates;
				this.triggerChange();
			}.bind(this));
	},
	triggerChange: function () {
		this.trigger('onChange', this.rates);
	}
});
