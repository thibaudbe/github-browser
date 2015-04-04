'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var AppActions = require('../actions/AppActions');


var ProjectStore = Reflux.createStore({

	init: function() {
		this.listenTo(AppActions.onGetData, this.getProject)
	},

	getProject: function(owner, repo) {
		var self = this;
		var domain = typeof process.env.PORT == 'undefined' ? 'http://localhost:5000' : 'http://localhost:'+ process.env.PORT;

		request
			.get(domain +'/api/project/'+ owner +'/'+ repo)
			.end(function(err, res){
				if (res.ok) {
					return self.trigger(res.body);
				} else {
					console.log('ERROR', err);
					return err;
				}
			}
		);
	}

});


module.exports = ProjectStore;
