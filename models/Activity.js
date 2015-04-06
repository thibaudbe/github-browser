
/**
 * Activity model
 * @param {string} item from Activity array
 */

var Activity = function (item) {
	return {
		days: [item.days],
		total: item.total,
		week: item.week
	}
};


module.exports = Activity;
