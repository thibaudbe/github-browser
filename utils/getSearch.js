var request = require('superagent');
var Item = require('../models/Item');


var getSearch = function(query, res) {

	var getData = function(_items) {
		return res.json({
			items: _items
		});
	};

	var getItems = function() {
		request
			.get('https://api.github.com/search/repositories?q='+ query)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (response.ok) {
					var _items = [];
					var _data = response.body;
					_data.items.map(function(item, i) {
						return _items.push(new Item(item))
					});
					return getData(_items);
				} else {
					return getData('Error fetching data');
				}
			}
		);
	}();

};


module.exports = getSearch;
