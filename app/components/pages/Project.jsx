'use strict';

var React      = require('react');
var Reflux     = require('reflux');
var reactAsync = require('react-async');

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;

var AppActions = require('../../actions/AppActions');
var ProjectStore = require('../../stores/ProjectStore');


var Project = React.createClass({

	mixins: [reactAsync.Mixin, Reflux.ListenerMixin],

	getInitialStateAsync: function(cb) {
		AppActions.onGetData(this.props.owner, this.props.repo);
		ProjectStore.listen(function(data) {
			try {
				return cb(null, data)
			} catch(err) {
				console.log('err', err);
			}
		})
	},

	render: function() {
		if ((typeof (this.state.infos || this.state.commits || this.state.contributors) == 'undefined'))
			return <div>Loading project</div>;

		return (
			<div>
				<h1>Project : {this.state.infos.repository.name} <small>- by {this.state.infos.owner.name}, since {this.state.infos.repository.created_at} -</small></h1>
				<hr/>
				<p>Timeline <small>- 100 latest commits -</small></p>
				<ul>
					{this.state.commits.map(function(elem, i) {
						return <li key={i}>{elem.date} <small>by {elem.name}</small></li>
					})}
				</ul>
				<hr/>
				<p>Contributors <small>- their 100 latest commits -</small></p>
				<ul>
					{this.state.contributors.map(function(elem, i) {
						return <li key={i}>{elem.name} <img src={elem.avatar_url} width="50" height="50" /></li>
					})}
				</ul>
			</div>
		);
	}

});


module.exports = Project;
