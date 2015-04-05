'use strict';

var React      = require('react');

var AppActions = require('../../actions/AppActions');


var Index = React.createClass({

	getInitialState : function() {
		return {
			// Return the current query string from pathname
			query: this.props.params.query || '',
			page: this.props.routes[1].name,
			focus: '',
			active: this.props.routes[1].name == 'index' ? 'is-inactived' : 'is-actived',
		};
	},

	componentDidMount: function() {
		console.log('this', this.state.page)
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

	render: function() {
		return (
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
		);
	}

});


module.exports = Index;
