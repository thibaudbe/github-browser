/** @jsx React.DOM */

var React = require('react');
var Info  = require('../components/Info.jsx');


var Index = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<div>
				<h1>App</h1>
				Javascript's browser is {this.props.state}.
				<Info />
			</div>
		);
	}

});

module.exports = Index;