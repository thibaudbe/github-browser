'use strict';

var React      = require('react');
var Reflux     = require('reflux');
var reactAsync = require('react-async');
var moment 	   = require('moment');

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;
var Navigation     = Router.Navigation;

var AppActions   = require('../../actions/AppActions');
var ProjectStore = require('../../stores/ProjectStore');
var Loader  	   = require('../partials/Loader.jsx');
var Error  	     = require('../partials/Error.jsx');

var Timeline  	 = require('../charts/Timeline.jsx');
var ProgressBar  	 = require('../charts/ProgressBar.jsx');


var Project = React.createClass({

	mixins: [reactAsync.Mixin, Reflux.ListenerMixin, Navigation],

	getInitialStateAsync: function(cb) {
		AppActions.onGetProject(this.props.owner, this.props.repo);
		ProjectStore.listen(function(data) {
			try {
				return cb(null, data)
			} catch(err) {
				return err
			}
		})
	},

	renderContributors: function() {
		return this.state.contributors.map(function(elem, i) {
			return (
				<li key={i}>
					<span className="number">{elem.contributions}</span> 
					<img src={elem.avatar_url} width="80" height="80" />
					<span className="name">{elem.name}</span> 
				</li>
			)
		})
	},

	renderActivity: function() {
		return this.state.activity.map(function(elem, i) {
			return (
				<li key={i}>
					<span className="number">{elem.value}</span> 
					<img src={elem.login !=='' ? 'https://avatars.githubusercontent.com/'+ elem.login : '/img/default.png'} width="80" height="80" />
					<span className="name">{elem.name}</span> 
				</li>
			)
		})
	},

	render: function() {
		if ((typeof (this.state.infos || this.state.commits || this.state.contributors || this.state.activity) == 'undefined'))
			return <Loader />

		if (typeof (this.state.infos || this.state.commits || this.state.contributors || this.state.activity) === 'string')
			return <Error />

		return (
			<DocumentTitle title={'Github Browser • '+ this.state.infos.repository.name}>
				<div className="page page-project">
					<Timeline commits={this.state.commits} />
					<div className="page__inner">
						<div className="infos has-background">
							<img src={'https://avatars.githubusercontent.com/'+ this.state.infos.owner.name} width="50" height="50" />
							<h1>{this.state.infos.repository.name}</h1>
							<p>&nbsp; / {this.state.infos.owner.name}</p>
						</div>
					</div>

					<div className="page__inner">
						<div className="activity">
							<h2>100 Last commits activity</h2>
							<ul className="list">
								{this.renderActivity()}
							</ul>
						</div>
					</div>
	
					<div className="page__inner">
						<div className="contributors has-background">
							<h2>All Contributors ({this.state.contributors.length})</h2>
							<ul className="list">
								{this.renderContributors()}
							</ul>
						</div>
					</div>

					<ProgressBar languages={this.state.languages} />
					
				</div>
			</DocumentTitle>
		);
	}

});


module.exports = Project;
