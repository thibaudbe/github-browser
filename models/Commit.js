
/**
 * Commit model
 * @param {string} item from Commits array
 */

var Commit = function (item) {
	return {
		name: item.commit.committer.name,
		date: item.commit.committer.date
	}
};


module.exports = Commit;
