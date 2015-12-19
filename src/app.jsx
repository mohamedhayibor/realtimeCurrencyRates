var Api = require('./api');
var React = require('react');
var Reflux = require('reflux');
var currencies = require('./currencies');
var Converter = require('./converter');
var RatesStore = require('./rates-store');
var Actions = require('./actions');


var Main = React.createClass({
  mixins: [
    Reflux.listenTo(RatesStore, 'onChange')
  ],
  getInitialState: function () {
    return {
      rates : {}
    }
  },
  componentWillMount: function () {
    Actions.getRates()
  },
  render: function() {
    var result = [];
    var names = this.state.rates;

    // gets all currency codes (keys) into an array then push each label into
    // the result array
    Object.keys(this.state.rates).forEach(function (i) {
      result.push(
        <li className="list-group-item" key={i}> {i + ' - ' + currencies[i] + ': ' }
            <span className="badge"> {(names[i] || '')}</span>
        </li>
      );
    });
    
    // allows us to get divide the table into 3 columns
    var divider = Math.ceil(result.length / 3), secondDiv = divider * 2;

    return (<div>
    	<Converter /> 
    	<hr/>
    	<p className="lead"><strong> Get real time foreign exchange rates on all currencies including Bitcoin.</strong>
  			<button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm"><span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			</button>

			<div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			  <div className="modal-dialog modal-sm">
			    <div className="modal-content">
			      <h5><strong>Currency codes lookup:</strong></h5>
			      You can search for different currency codes by typing the currency names into the browser search feature. For example: "Ctrl + F" on Chrome.
			    </div>
			  </div>
			</div>
  		</p>

  		<p className="lead">*Rates on the table are in comparison to the USD</p>
    		<section>
		    <ul className="list-group">
		    	<div className="col-xs-4">
			    	{result.slice(0, divider)}
			    </div>
			    <div className="col-xs-4">
			    	{result.slice(divider, secondDiv)}
			    </div>
			    <div className="col-xs-4">
			    	{result.slice(secondDiv)}
			    </div>
		    </ul>
  		</section>
  	</div>)
  },
  onChange: function (event, rates) {
    this.setState({ rates: rates })
  }
});

var element = React.createElement(Main, RatesStore.getRates());
React.render(element, document.querySelector('.converter'));
