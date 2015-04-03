
/**
 * Item model
 * @param {string} item from Items array
 */

var Item = function (item) {
	return {
		repository: {
			name: item.name,
			description: item.description,
			created_at: item.created_at,
			updated_at: item.updated_at,
			pushed_at: item.pushed_at,
			size: item.size,
			language: item.language,
			watchers: item.watchers
		},
		owner: {
			name: item.owner.login,
			avatar: item.owner.avatar,
			url: item.owner.url
		}
	}
};


module.exports = Item;
