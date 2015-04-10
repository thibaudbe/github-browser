
/**
 * Contributor model
 * @param {String} item  > From Contributors array
 */

var Contributor = function (item) {
	return {
		name: item.login,
		avatar_url: item.avatar_url,
		contributions: item.contributions
	}
};


module.exports = Contributor;
