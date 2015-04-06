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
		if (typeof this.context.router.goBack() !== 'undefined') {
			if (this.state.page == 'index') {
				this.context.router.transitionTo('app', {});
			} else if (this.state.page == 'list') {
				this.context.router.transitionTo('list', { query: this.state.query });
			} else if (this.state.page == 'project') {
				this.context.router.transitionTo('project', { params: this.state.params });
			}
		} else {
			this.context.router.goBack()
		}
	},

	render: function() {
		return (
			<div className="form-group">
				<div className={'form '+ this.state.focus + ' '+ this.state.active}>
					<form onSubmit={this.handleSubmit}>
						<a href className="back" onClick={this.handleBack}>
							<i className="icon fa fa-arrow-left"></i>
						</a>
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
