'use strict';

var React      = require('react/addons');
var Reflux     = require('reflux');
var reactAsync = require('react-async');
var moment 	   = require('moment');

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;

var AppActions  = require('../../actions/AppActions');
var SearchStore = require('../../stores/SearchStore');


var Index = React.createClass({

	mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

	getInitialStateAsync: function(cb) {
		AppActions.onSearch(this.props.query)
		SearchStore.listen(function(data) {
			console.log('data', data);
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
							<Link to="project" params={{owner: elem.owner.name, repo: elem.repository.name}}>
								<b>{elem.repository.name}</b> <small>by {elem.owner.name}</small>
								<span className="date">since {moment(elem.repository.created_at).format("MMM Do YY")}</span>
								<span className="size">{elem.repository.size} Kb</span>
							</Link>
					</li>
				)
			}.bind(this))
		}
	},

	render: function() {
		if ((typeof this.state.items == 'undefined') || (typeof this.state.items == null)) {
			return (
				<div className="page page-loading">
					<div className="loading">
						<img src="/img/github-loader.gif" width="100" height="100" />
					</div>
				</div>
			);
		}

		return (
			<DocumentTitle title={'Github Browser • '+ this.props.query}>
				<div className="page page-search">
					<div className="page__inner">
						<h1>Results for : <i>{this.props.query}</i></h1>
					</div>
					<hr/>
					<div className="page__inner">
						<ul className="list">
							{this.renderList()}
						</ul>
					</div>
				</div>
			</DocumentTitle>
		);
	}

});


module.exports = Index;
