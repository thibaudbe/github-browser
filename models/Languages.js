
/**
 * Languages model
 * @param {object} item from Languages object
 */

var Languages = function (item) {
	var obj0 = {};
	var new_array = [];

	var total = eval(Object.keys(item).map(function(elem, i){
		return item[elem]
	}).join('+'));

	Object.keys(item).map(function(elem, i){
	  var obj = {};
	  obj['label'] = Object.keys(item)[i];
	  obj['value'] = item[elem];
	  obj['percentage'] = Math.ceil((item[elem] / total) * 100);
	  return new_array.push(obj) 
	});

	obj0['total'] = total;
	obj0['items'] = new_array

	return obj0
};


module.exports = Languages;
