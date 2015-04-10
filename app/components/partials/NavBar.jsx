'use strict';

var React      = require('react');

var AppActions = require('../../actions/AppActions');


var Index = React.createClass({

	getInitialState : function() {
		return {
			// Return the current query string from pathname
			query: this.props.params.query || '',
			params: this.props.params,
			page: this.props.routes[1].name,
			focus: '',
			active: this.props.routes[1].name == 'index' ? 'is-inactived' : 'is-actived',
		};
	},

	componentDidMount: function() {
		if (this.state.page == 'index') {
			this.refs.search.getDOMNode().focus()
		}
	},

	handleQuery: function(e) {
		this.setState({ query: e.target.value });
	},

	handleFocus: function() {
		this.setState({ focus: 'is-focused' })
	},

	handleBlur: function() {
		this.setState({ focus: '' })
	},

	handleSubmit: function(e) {
		e.preventDefault();
		if (this.state.query.trim().length) {
			this.props.onSearch(this.state.query)

			// Only on home page
			if (this.state.page == 'index') {
				this.setState({ active: 'is-actived' })
			}
		}
	},

	handleBack: function() {
		if (this.state.page == 'index') {
			// console.log('> index')
		} else if (this.state.page == 'list') {
			// console.log('> list')
			// this.context.router.transitionTo('app', {});
			return '/'
		} else if (this.state.page == 'project') {
			// console.log('> project', this.state.query)
			// this.context.router.transitionTo('list', { query: this.state.query });
			return 'search/'+ this.state.query
			// this.context.router.transitionTo('project', { owner: this.state.params.owner, repo: this.params.repo });
		}
		// if (typeof this.context.router.goBack() !== 'undefined') {
		// 	console.log('goBack() undefined')
		// } else {
		// 	console.log('goBack() OK')
		// 	this.context.router.goBack()
		// }
						// <a href={this.handleBack} className="back">
						// 	<i className="icon fa fa-arrow-left"></i>
						// </a>
	},

	render: function() {
		return (
			<div className="form-group">
				<div className={'form '+ this.state.focus + ' '+ this.state.active}>
					<form onSubmit={this.handleSubmit}>
						<input 
							type="text" 
							name="q" 
							ref="search"
							onFocus={this.handleFocus} 
							onBlur={this.handleBlur} 
							onChange={this.handleQuery} 
							defaultValue={this.state.query} 
							placeholder="Search a repository here." />
						<button type="submit">
							<i className="icon fa fa-search"></i>
						</button>
					</form>
				</div>
			</div>
		);
	}

});


module.exports = Index;
