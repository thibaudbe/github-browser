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
var Loader  	  = require('../partials/Loader.jsx');
var Error  	  = require('../partials/Error.jsx');


var Index = React.createClass({

	mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

	getInitialStateAsync: function(cb) {
		AppActions.onGetSearch(this.props.query)
		SearchStore.listen(function(data) {
			try {
				return cb(null, data)
			} catch(err) {
				return err
				// console.log('err', err);
			}
		})
	},

	componentDidMount: function() {
		this.listenTo(SearchStore, this.refreshSearch)
	},

	componentWillReceiveProps: function(nextProps) {
		if(typeof nextProps.query !== 'undefined') {
			AppActions.onGetSearch(nextProps.query)
		}
	},

	refreshSearch: function(data) {
		this.setState(data)
	},

	renderList: function() {
		if ((typeof this.state.items !== 'undefined') || (this.state.items !== null)) {
			return this.state.items.map(function(elem, i) {
							// <span className="update"><i className="icon fa fa-clock-o"></i>Updated {moment(elem.repository.updated_at).startOf('day').fromNow()}</span>
				return (
					<li key={i}>
						<Link to="project" params={{owner: elem.owner.name, repo: elem.repository.name}}>
							<b>{elem.repository.name}</b>
							<span className="name"> / {elem.owner.name}</span>
							<span className="info">
								<b>{elem.repository.language}</b>
								<span className="size"><i className="icon fa fa-star-o"></i> {elem.repository.stargazers}</span>
								<span className="size"><i className="icon fa fa-code-fork"></i> {elem.repository.forks}</span>
							</span>
						</Link>
					</li>
				)
			}.bind(this))
		}
	},

	renderHeader: function() {
		var item_width = this.state.items.length;
		if (item_width > 1) {
			return (
				<h1>
					<i className="icon fa fa-search"></i>
					<span className="light">{item_width} Results for</span>
					&nbsp;<i>{this.props.query}</i>
				</h1>
			)
		} else if (item_width == 0) {
			return (
				<h1>
					<i className="icon fa fa-exclamation-triangle"></i>
					<span className="light">Oops ! no results founded for</span>
					&nbsp;<i>{this.props.query}</i>
				</h1>
			)
		} else {
			return (
				<h1>
					<i className="icon fa fa-search"></i>
					<span className="light">{item_width} Result for</span>
					&nbsp;<i>{this.props.query}</i>
				</h1>
			)
		}
	},

	render: function() {
		if ((typeof this.state.items == 'undefined') || (typeof this.state.items == null))
			return <Loader />

		if (typeof this.state.items === 'string')
			return <Error />

		return (
			<DocumentTitle title={'Github Browser • '+ this.props.query}>
				<div className="page page-list">
					<div className="page__inner">
						<div className="page__content">
							{this.renderHeader()}
						</div>
					</div>
					<hr/>
					<div className="page__inner">
						<div className="page__content">
							<ul className="list">
								{this.renderList()}
							</ul>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}

});


module.exports = Index;
