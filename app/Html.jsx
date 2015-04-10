'use strict';

var React = require('react');


var Html = React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
					<title>Github Browser</title>
					<meta name="description" content="A reactjs isomorphic github browser" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="apple-touch-icon" href="apple-touch-icon.png" />
					<link rel="stylesheet" href="/css/main.min.css?v=100" />
					<script type="text/javascript" src="/js/head-bundle.js?v=100"></script>
				</head>
				<body>
					<div className="server-side" dangerouslySetInnerHTML={{__html: this.props.markup}} {...this.props.path} />
					<script type="text/javascript" src="/js/bundle.js?v=100"></script>
				</body>
			</html>
		);
	}

});


module.exports = Html;
