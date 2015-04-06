'use strict';

var React = require('react');


var Loader = React.createClass({

	render: function() {
		return (
			<div className="page page-loading">
				<div className="loading">
					<img src="/img/github-loader.gif" width="100" height="100" />
				</div>
			</div>
		);
	}

});

module.exports = Loader;
