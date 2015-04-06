'use strict';

var React = require('react');


var Error = React.createClass({

	render: function() {
		return (
			<div className="page page-error">
				<p>Error Fetching data.</p>
			</div>
		);
	}

});

module.exports = Error;
