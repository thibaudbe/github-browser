var request = require('superagent');

var Info = require('../models/Info');
var Commit = require('../models/Commit');
var Contributor = require('../models/Contributor');


var getProject = function(owner, repo, res) {

	var getData = function(_infos, _commits, _contributors) {
		return res.json({
			infos: _infos,
			commits: _commits,
			contributors: _contributors
		});
	};

	var getContributors = function(_infos, _commits) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/contributors')
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _contributors = [];
					var _data = response.body;
					_data.map(function(item, i) {
						return _contributors.push(new Contributor(item))
					});
					return getData(_infos, _commits, _contributors);
				} else {
					return getData(_infos, _commits, 'Error fetching data');
				}
			}
		);
	};

	var getCommits = function(_infos) {
		request
			.get('https://api.github.com/repos/'+ owner +'/'+ repo +'/commits?per_page=100')
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
			.get('https://api.github.com/repos/'+ owner +'/'+ repo)
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
