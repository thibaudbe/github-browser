'use strict';

var Reflux = require('reflux');
var request = require('superagent');


var AppActions = Reflux.createActions([
	'onSearch',
  'onGetData'
]);


module.exports = AppActions;
