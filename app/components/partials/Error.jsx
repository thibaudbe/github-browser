'use strict';

var React = require('react');


var Error = React.createClass({

	render: function() {
		return (
			<div className="page page-error">
				<div className="screen">
					<div className="center">
						<p>Error Fetching data.</p>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Error;
