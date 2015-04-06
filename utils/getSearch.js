var request = require('superagent');
var Item = require('../models/Item');

var client_id = '6e6440e901ad7b68e0e0';
var client_secret = '24d761b515a97b9ac0b1a429720d9c5d05872911';


var getSearch = function(query, res) {

	var getData = function(_items) {
		return res.json({
			items: _items
		});
	};

	var getItems = function() {
		request
			.get('https://api.github.com/search/repositories?q='+ query +'&client_id='+ client_id +'&client_secret='+ client_secret)
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
