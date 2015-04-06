'use strict';

var Reflux = require('reflux');
var request = require('superagent');


var AppActions = Reflux.createActions([
	'onGetSearch',
  'onGetProject'
]);


module.exports = AppActions;
