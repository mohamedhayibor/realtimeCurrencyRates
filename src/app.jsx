var React = require('react');
var currencies = require('./currencies');
var rates = require('./rates').rates;
var Converter = require('./converter');

var Main = React.createClass({

  render: function() {
  	var names = this.props;
    var result = [];

    Object.keys(this.props).forEach(function (i) {
    	result.push(
    		<li className="list-group-item" key={i}> {i + ' - ' + names[i] + ': ' }
    			  <span className="badge"> {(rates[i] || '')}</span>
    		</li>
    	);

    });
    var divider = Math.ceil(result.length / 3), secondDiv = divider * 2;

    return (<div>
    	<Converter /> 
    	<hr/>
    	<p className="lead"><strong> Get real time foreign exchange rates on all currencies including Bitcoin.</strong>
  			<button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm"><span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			</button>

			<div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
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
  }
});

var element = React.createElement(Main, currencies);
React.render(element, document.querySelector('.converter'));