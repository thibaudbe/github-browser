'use strict';

var React           = require('react');
var DocumentTitle   = require('react-document-title');


var Index = React.createClass({

  render: function() {
    return (
      <DocumentTitle title={'Github React'}>
        <div>
          <h1>Github React</h1>
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = Index;
