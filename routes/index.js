var express = require('express');
var router = express.Router();
var request = require('superagent');

var getSearch = require('../utils/getSearch');
var getProject = require('../utils/getProject');

// JSX compiler
require('node-jsx').install({ extension: '.jsx' });

var React = require('react');
var ReactAsync = require('react-async')
var Router = require('react-router');
var Routes = require('../app/Routes.jsx');
var Html = require('../app/Html.jsx');

var api_path = '/api';


/**
 * GET API
 */
router.get(api_path, function(req, res) {
	return res.json({'message': 'API'})
});

router.get(api_path +'/search/:query', function(req, res, next) {	
	return getSearch(req.params.query, res)
});

router.get(api_path +'/project/:owner/:repo', function(req, res, next) {
	console.log('repo', req.params.owner, req.params.repo)
	return getProject(req.params.owner, req.params.repo, res)
});


/**
 * GET React
 */
router.use(function(req, res, next) {

	// Enable search form without JavaScript
	if(req.query.q) return res.redirect('/search/'+ req.query.q)

	// Html bootstrap
	Router.run(Routes, req.url, function(Handler, state) {
		// Async API loader
		ReactAsync.renderToStringAsync(React.createElement(Handler, state), function(err, markup) {
			if (err) return next(err);
			
			res.send('<!DOCTYPE html>'
				+ '<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->'
				+ '<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->'
				+ '<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->'
				+ '<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->'
				+ React.renderToStaticMarkup(
					React.createElement(Html, { 
						markup: markup, 
						path: req.path 
					})
				)
			);
		});
	})
});


module.exports = router;
