'use strict';

var React      = require('react');
var Reflux     = require('reflux');
var reactAsync = require('react-async');

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;

var AppActions = require('../../actions/AppActions');
var SearchStore = require('../../stores/SearchStore');

// var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
// var React = require('react/addons');
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
// var VelocityTransitionGroup = require('../ui/VelocityTransitionGroup.jsx');


var Index = React.createClass({

	mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

	getInitialStateAsync: function(cb) {
		AppActions.onSearch(this.props.query)
		SearchStore.listen(function(data) {
			try {
				return cb(null, data)
			} catch(err) {
				console.log('err', err);
			}
		})
	},

	componentDidMount: function() {
		this.listenTo(SearchStore, this.refreshSearch)
	},

	componentWillReceiveProps: function(nextProps) {
		if(typeof nextProps.query !== 'undefined') {
			AppActions.onSearch(nextProps.query)
		}
	},

	refreshSearch: function(data) {
		this.setState(data)
	},

	renderList: function() {
		if ((typeof this.state.items !== 'undefined') || (this.state.items !== null)) {
			return this.state.items.map(function(elem, i) {
				return (
					<li key={i}>
						{/*<VelocityTransitionGroup transitionName="example">*/}
							<Link to="project" params={{owner: elem.owner.name, repo: elem.repository.name}}>
								<b>{elem.repository.name}</b> <small>by {elem.owner.name}</small>
							</Link>
						{/*</VelocityTransitionGroup>*/}
					</li>
				)
			}.bind(this))
		}
	},

	render: function() {
		if ((typeof this.state.items == 'undefined') || (typeof this.state.items == null))
			return <div>Loading list</div>;

		return (
			<div>
				<h1>List page</h1>
				<ul>
					{this.renderList()}
				</ul>
			</div>
		);
	}

});


module.exports = Index;
