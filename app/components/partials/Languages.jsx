'use strict';

var React     = require('react');
var DoughnutChart = require('react-chartjs').Doughnut;
var moment 	  = require('moment');
var stringToColor 	  = require('../../utils/stringToColor');


var Languages = React.createClass({

	getInitialState: function() {
		return {
			languages: this.props.languages
		}
	},

	getData: function() {
		var array = [];
		
		this.state.languages.items.map(function(elem, i) {
			var obj = {};
			obj['label'] = elem.label;
			obj['value'] = elem.percentage;
			obj['highlight'] = '#'+ stringToColor(elem.label);
			obj['color'] = '#'+ stringToColor(elem.label);
			
			return array.push(obj)
		})
		return array
	},

	renderItems: function() {
		return this.state.languages.items.map(function(elem, i) {
			return (
				<li key={i}>
					<span className="percentage" style={{color: '#'+ stringToColor(elem.label)}}>{elem.percentage}%</span>
					<span className="label">{elem.label}</span>
				</li>
			)
		})
	},

	render: function() {
		return (
			<div className="page__inner">
				<h2>{this.state.languages.items.length} Languages</h2>
				<div className="page__content">
					<div className="languages">
						<div className="col-8">
							<ul className="list">
								{this.renderItems()}
							</ul>
						</div>
						<div className="col-4">
							<DoughnutChart data={this.getData()} width="236" height="236" />
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Languages;
