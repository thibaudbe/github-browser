
/**
 * Languages model
 * @param {Object} item > item from data API
 * @return {Object}     > New data array
 */
var Languages = function (item) {

	var _total = eval(Object.keys(item).map(function(elem, i){
		return item[elem]
	}).join('+'));

	var _array = [].map.call(Object.keys(item), function(elem, i){
		return {
			label: Object.keys(item)[i],
			value: item[elem],
			percentage: Math.ceil((item[elem] / _total) * 100)
		}
	});

	return {
		total: _total,
		items: _array
	}
};


module.exports = Languages;
