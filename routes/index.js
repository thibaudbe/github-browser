var express = require('express');
var router = express.Router();
var request = require('superagent');

var getSearch = require('../utils/getSearch');
var getProject = require('../utils/getProject');

// JSX compiler
require('node-jsx').install();

var api_path = '/api';


/**
 * GET index
 */
var React = require('react');
var Index = React.createFactory(require('../app/components/Index.jsx'));

router.get('/', function(req, res){
	var html = React.renderToString(Index());

	// Loading in the Ejs template
	res.render('index', { 
		reactOutput: html 
	});
});


/**
 * GET API
 */
router.get(api_path, function(req, res) {
 return	res.json({'message': 'API'})
});

router.get(api_path +'/search/:id', function(req, res, next) {	
	return getSearch(req.params.id, res);
});

router.get(api_path +'/project/:owner/:repo', function(req, res, next) {	
	return getProject(req.params.owner, req.params.repo, res);
});


module.exports = router;
