'use strict';

var React 				= require('react');
var DocumentTitle	= require('react-document-title');
var Router 				= require('react-router');
var Navigation    = Router.Navigation;
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;
var State         = Router.State;

var Routes        = require('./Routes.jsx');
var Navbar        = require('./components/partials/Navbar.jsx');
var Footer        = require('./components/partials/Footer.jsx');


var App = React.createClass({
	mixins: [Navigation],

	getInitialState: function() {
		return {
			// Return path object from server router
			path: typeof window === 'undefined' ? this.props.path : window.location.pathname,
		}
	},

	onSearch: function(query) {
		this.context.router.transitionTo('list', { query: query })
	},

	render: function() {
		return (
			<DocumentTitle title={'Github Browser'}>
				<div className="wrap">
					<div className="wrap__inner">
						<Navbar onSearch={this.onSearch} {...this.props} />
						<RouteHandler {...this.props.params} />
					</div>
					<Footer/>
				</div>
			</DocumentTitle>
		)
	}

});


module.exports = App;


/**
 * Client bootstrap
 */
if (typeof window !== 'undefined') {
	Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
		React.render(
			<Handler {...state} />,
			document.body
		);
	});
}
