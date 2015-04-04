'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var AppActions = require('../actions/AppActions');


var SearchStore = Reflux.createStore({

  init: function() {
    this.listenTo(AppActions.onSearch, this.getSearch)
  },

  getSearch: function(query) {
    var self = this;
		var domain = typeof process.env.PORT == 'undefined' ? 'http://localhost:5000' : 'http://localhost:'+ process.env.PORT;
    
		request
			.get(domain +'/api/search/'+ query)
      .end(function(err, res){
        if (res.ok) {
          return self.trigger(res.body);
        } else {
          console.log('ERROR', err);
          return err;
        }
      });
  }

});


module.exports = SearchStore;
