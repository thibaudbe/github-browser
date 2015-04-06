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

// Chart.defaults.global.responsive = true;

var AppActions   = require('../../actions/AppActions');
var ProjectStore = require('../../stores/ProjectStore');
var Loader  	   = require('../partials/Loader.jsx');
var Error  	     = require('../partials/Error.jsx');
var Activity  	 = require('../partials/Activity.jsx');
var Commits  	   = require('../partials/Commits.jsx');
var Languages  	 = require('../partials/Languages.jsx');


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

	render: function() {
		if ((typeof (this.state.infos || this.state.commits || this.state.contributors || this.state.activity) == 'undefined'))
			return <Loader />

		if (typeof (this.state.infos || this.state.commits || this.state.contributors || this.state.activity) === 'string')
			return <Error />

		console.log('this.state', this.state)

		return (
			<DocumentTitle title={'Github Browser • '+ this.state.infos.repository.name}>
				<div className="page page-project">
					<div className="page__inner">
						<div className="infos has-background">
							<img src={'https://avatars.githubusercontent.com/'+ this.state.infos.owner.name} width="100" height="100" />
							<h1>{this.state.infos.repository.name}</h1>
							<p>since {moment(this.state.infos.repository.created_at).subtract(10, 'days').calendar()}, by {this.state.infos.owner.name}</p>
						</div>
					</div>
					
					<Activity activity={this.state.activity} />

					<div className="page__inner">
						<div className="contributors has-background">
							<h2>{this.state.contributors.length} Contributors</h2>
							<ul className="list">
								{this.renderContributors()}
							</ul>
						</div>
					</div>
					
					<Commits commits={this.state.commits} />

					<Languages languages={this.state.languages} />
					
				</div>
			</DocumentTitle>
		);
	}

});


module.exports = Project;
