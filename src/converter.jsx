// This is responsible for converter bar's UI
// fetches the rates for specific curreny codes then calculates the proper conversion amount

var Api = require('./api');
var React = require('react');
var currencies = require('./currencies');
var RatesStore = require('./rates-store');
var Reflux = require('reflux');
var Actions = require('./actions');

var Converter = React.createClass({
  mixins: [
  	Reflux.listenTo(RatesStore, 'onChange')
  ],
  getInitialState: function () {
  	return {
  		rates: {}
  	}
  },
  componentWillMount: function () {
  	Actions.getRates()
  },
  handleClick: function(e) {
  	e.preventDefault();

  	var convertCode = (document.getElementById("convertCode").value).toUpperCase();
	var convertedCode = (document.getElementById("convertedCode").value).toUpperCase();
	var initialAmount = (document.getElementById("initialAmount").value).toUpperCase();
	var result;

	if (!(this.state.rates.hasOwnProperty(convertCode)) || !(this.state.rates.hasOwnProperty(convertedCode)) )  {
		if (document.getElementById("child")) {
			document.getElementById("collapseExample").removeChild(document.getElementById("child"));
		}
		var newElement = document.createElement('div');
		newElement.setAttribute("class", "alert alert-warning");
		newElement.setAttribute("id", "child")
		newElement.setAttribute("role", "alert");
		var newContent = document.createTextNode('Please input correct currency codes.');
		newElement.appendChild(newContent);
		
		document.getElementById("collapseExample").appendChild(newElement);

	} else {
		// rounding 4 places
		result = Math.round((this.state.rates[convertedCode] / this.state.rates[convertCode]) * initialAmount * 10000) / 10000; 

		if (document.getElementById("child")) {
			document.getElementById("collapseExample").removeChild(document.getElementById("child"));
		}
		var newElement = document.createElement('div');
		newElement.setAttribute("class", "alert alert-success");
		newElement.setAttribute("id", "child")
		newElement.setAttribute("role", "alert");
		var newContent = document.createTextNode( initialAmount + ' ' + convertCode + ' = ' + result + ' ' + convertedCode);
		newElement.appendChild(newContent);
		
		document.getElementById("collapseExample").appendChild(newElement);

	}
  },
  render: function() {
    return <section>
    	<div className="row">
  			<div className="convertbar">
		  		<form className="form-inline">
				  <div className="form-group">
				    <label> From </label>
				    <input type="text" className="form-control"
				    	id="convertCode"
				    	placeholder="USD, EUR, BRL, JPY..."/>
				  </div>
				  <div className="form-group">
				    <label> To</label>
				    <input type="text" className="form-control"
				    	id="convertedCode" placeholder="USD, EUR, BRL, JPY..."/>
				    <input type="number" className="form-control"
				    	id="initialAmount" placeholder="Amount to convert"/>
				  </div>
				  <button onClick={this.handleClick} className="btn btn-primary"
				  	data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"
				  	aria-controls="collapseExample">Convert</button>
				  <div className="collapse" id="collapseExample">
				  	
				  </div>
				</form>
			</div>
		</div>
	</section>
  },
  onChange: function (event, rates) {
  	this.setState({ rates: rates })
  }
});

module.exports = Converter;
