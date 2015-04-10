var moment = require('moment');


/**
 * Item model
 * @param {Object} item > From data array
 */
var Item = function(item) {
	this.date = moment(item.commit.author.date).format('MMM Do YY');
	this.value = 1;
};


/**
 * Group by key and eval value array
 * @param  {Object}   array    > Data array
 * @param  {Function} callback > Select the key to group by
 * @return {Object}            > New data array
 */
var groupByAndEval = function(array, callback) {
	var obj = {};
	array.forEach(function(item, i) {
		var that = callback(item);
		obj[that] = obj[that] || [];
		obj[that].push(item);
	});
	return [].map.call(Object.keys(obj), function (item) {
		var date = null;
		var nb = [];
		obj[item].forEach(function (elem, i) {
			if (i == 0) { 
				nb = [];
				date = elem.date;
			}
			nb.push(elem.value)
		});
		return {
			label: date,
			value: eval(nb.join('+'))
		};
	})  
};


/**
 * Dispatch and create a new array
 * @param {Object} data > Response from API
 */
var Commit = function(data) {
	var _tmp = data.map(function(item) {
		return new Item(item);
	});

	var _data = groupByAndEval(_tmp, function (item) {
		return [item.date];
	});
	
	return _data;
};


module.exports = Commit;
