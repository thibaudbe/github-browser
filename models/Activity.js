

/**
 * Item model
 * @param {Object} item > From data array
 */
var Item = function(item) {
	this.name = item.commit.author.name;
	this.login = item.committer !== null ? item.committer.login : '';
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
		var name = null;
		var nb = [];
		obj[item].forEach(function (elem, i) {
			if (i == 0) { 
				nb = [];
				name = elem.name;
				login = elem.login;
			}
			nb.push(elem.value)
		});
		return {
			login: login,
			name: name,
			value: eval(nb.join('+'))
		};
	})  
};


/**
 * Sort an array by key (decremental)
 * @param  {Object} array [description]
 * @param  {String} key   [description]
 * @return {Object}       > new sorted array
 */
var sortByKey = function(array, key) {
	return array.sort(function(a, b) {
		var x = a[key]; 
		var y = b[key];
		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	});
};


/**
 * Dispatch and create a new array
 * @param {Object} data > Response from API
 */
var Activity = function(data) {
	var _tmp = data.map(function(item) {
		return new Item(item);
	});

	var _data = groupByAndEval(_tmp, function (item) {
		return [item.name];
	});
	
	return sortByKey(_data, 'value');
};


module.exports = Activity;
