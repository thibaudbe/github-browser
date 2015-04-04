'use strict';

var React      = require('react');

var AppActions = require('../../actions/AppActions');


var Index = React.createClass({

  getInitialState : function() {
    return {
      // Return the current query string from pathname
      query: this.props.query || ''
    };
  },

  componentDidMount: function() {
    this.refs.search.getDOMNode().focus()
  },

  handleQuery: function(e) {
    this.setState({ query: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.query.trim().length) {
      this.props.onSearch(this.state.query)
    }
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="q" 
          ref="search"
          onChange={this.handleQuery} 
          defaultValue={this.state.query} 
          placeholder="Search a repository here." />
        <button type="submit">Search</button>
      </form>
    );
  }

});


module.exports = Index;
