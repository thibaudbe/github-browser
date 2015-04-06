var request = require('superagent');

var Info        = require('../models/Info');
var Commit      = require('../models/Commit');
var Contributor = require('../models/Contributor');
var Activity    = require('../models/Activity');
var Languages   = require('../models/Languages');

var client_id = '6e6440e901ad7b68e0e0';
var client_secret = '24d761b515a97b9ac0b1a429720d9c5d05872911';


var getProject = function(owner, repo, res) {

	var getData = function(_infos, _commits, _contributors, _activity, _languages) {
		return res.json({
			infos: _infos,
			commits: _commits,
			contributors: _contributors,
			activity: _activity,
			languages: _languages
		});
	};

	var getLanguages = function(_infos, _commits, _contributors, _activity) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/languages?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _languages = new Languages(response.body);
					return getData(_infos, _commits, _contributors, _activity, _languages);
				} else {
					return getData(_infos, _commits, _contributors, _activity, 'Error fetching data');
				}
			}
		);
	};

	var getActivity = function(_infos, _commits, _contributors) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/stats/commit_activity?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _activity = [];
					var _data = response.body;
					console.log('response.body', response.body);
					if (Array.isArray(_data)) {
						_data.map(function(item, i) {
							return _activity.push(new Activity(item))
						});
					}
					return getLanguages(_infos, _commits, _contributors, _activity);
				} else {
					return getLanguages(_infos, _commits, _contributors, 'Error fetching data');
				}
			}
		);
	};

	var getContributors = function(_infos, _commits) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/contributors?client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _contributors = [];
					var _data = response.body;
					_data.map(function(item, i) {
						return _contributors.push(new Contributor(item))
					});
					return getActivity(_infos, _commits, _contributors);
				} else {
					return getActivity(_infos, _commits, 'Error fetching data');
				}
			}
		);
	};

	var getCommits = function(_infos) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/commits?per_page=100&client_id='+ client_id +'&client_secret='+ client_secret)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _commits = [];
					var _data = response.body;
					_data.map(function(item, i) {
						return _commits.push(new Commit(item))
					});
					return getContributors(_infos, _commits);
				} else {
					return getContributors(_infos, 'Error fetching data');
				}
			}
		);
	};

	var getInfos = function() {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'?client_id='+ client_id +'&client_secret='+ client_secret)
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
