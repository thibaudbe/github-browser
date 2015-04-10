
/**
 * List model
 * @param {object} item > From Items object
 */

var List = function (item) {
	return {
		repository: {
			name: item.name,
			description: item.description,
			created_at: item.created_at,
			updated_at: item.updated_at,
			pushed_at: item.pushed_at,
			size: item.size,
			language: item.language,
			watchers: item.watchers,
			stargazers: item.stargazers_count,
			forks: item.forks_count
		},
		owner: {
			name: item.owner.login,
			avatar: item.owner.avatar,
			url: item.owner.url
		}
	}
};


module.exports = List;
