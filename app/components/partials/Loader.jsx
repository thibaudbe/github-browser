'use strict';

var React = require('react');


var Loader = React.createClass({

	render: function() {
		return (
			<div className="screen">
				<div className="center">
					<div className="loading">
						<img src="/img/github-loader.gif" width="100" height="100" />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Loader;
