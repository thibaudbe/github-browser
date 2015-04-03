/** @jsx React.DOM */

var React = require('react');


var Info = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<div>
				<p><i>An isomorphic proof of concept.</i></p>
			</div>
		);
	}

});

module.exports = Info;