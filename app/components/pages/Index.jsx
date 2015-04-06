'use strict';

var React           = require('react');
var DocumentTitle   = require('react-document-title');


var Index = React.createClass({

	render: function() {
		return (
			<DocumentTitle title={'Github Browser'}>
				<div className="screen">
					<div className="center">
						<div className="logo">
							<img src="/img/github-logo.png" width="100" height="100" />
							<h1>Github Browser</h1>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;
