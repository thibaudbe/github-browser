var request = require('superagent');

var Info        = require('../models/Info');
var Commit      = require('../models/Commit');
var Contributor = require('../models/Contributor');
var Activity    = require('../models/Activity');
var Languages   = require('../models/Languages');

var client_id = '6e6440e901ad7b68e0e0';
var client_secret = '24d761b515a97b9ac0b1a429720d9c5d05872911';
var api_url = 'https://api.github.com/repos/';


/**
 * Chain request from API
 * @param  {String} owner > Name of a repository owner
 * @param  {String} repo  > Name of the respository
 * @param  {Function} res > from express server request
 * @return {Object}       > JSON data render
 */
var getProject = function(owner, repo, res) {

	var getData = function(_infos, _commits, _activity, _contributors, _languages) {
		return res.json({
			infos: _infos,
			commits: _commits,
			contributors: _contributors,
			activity: _activity,
			languages: _languages
		});
	};

	var getLanguages = function(_infos, _commits, _activity, _contributors) {
		request
			.get(api_url + owner +'/'+ repo +'/languages?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _languages = new Languages(response.body);
					return getData(_infos, _commits, _activity, _contributors, _languages);
				} else {
					return getData(_infos, _commits, _activity, _contributors, 'Error fetching data');
				}
			}
		);
	};

	var getContributors = function(_infos, _commits, _activity) {
		request
			.get(api_url + owner +'/'+ repo +'/contributors?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _contributors = [];
					var _data = response.body;
					_data.map(function(item, i) {
						return _contributors.push(new Contributor(item))
					});
					return getLanguages(_infos, _commits, _activity, _contributors);
				} else {
					return getLanguages(_infos, _commits, _activity, 'Error fetching data');
				}
			}
		);
	};

	var getCommits = function(_infos) {
		request
			.get(api_url + owner +'/'+ repo +'/commits?per_page=100&client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					_commits = new Commit(response.body);
					_activity = new Activity(response.body);
					return getContributors(_infos, _commits, _activity);
				} else {
					return getContributors(_infos, 'Error fetching data', 'Error fetching data');
				}
			}
		);
	};

	var getInfos = function() {
		request
			.get(api_url + owner +'/'+ repo +'?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _infos = new Info(response.body);
					return getCommits(_infos);
				} else {
					return getCommits('Error fetching data');
				}
			}
		);
	}();

};


module.exports = getProject;
