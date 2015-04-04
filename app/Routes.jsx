'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App       = require('./App.jsx');
var Index     = require('./components/pages/Index.jsx');
var List      = require('./components/pages/List.jsx');
var Project   = require('./components/pages/Project.jsx');
var NotFound  = require('./components/pages/NotFound.jsx');


var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute name="index" handler={Index} />
		<Route name="list" path="/search/:query" handler={List} />
		<Route name="project" path="/project/:owner/:repo" handler={Project} />
		<NotFoundRoute handler={NotFound} />
	</Route>
);


module.exports = routes;
