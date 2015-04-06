'use strict';

var React     = require('react');
var LineChart = require('react-chartjs').Line;
var moment 	  = require('moment');


var Activity = React.createClass({

	getInitialState: function() {
		return {
			activity: this.props.activity
		}
	},

	getData: function() {
		// var gradient = ctx.createLinearGradient(0, 0, 0, 400);
		// gradient.addColorStop(0, 'rgba(96, 174, 220, 0.67)');   
		// gradient.addColorStop(1, 'rgba(255,255,255,1)');
		
		var arrLabels = [];
		var labels = this.state.activity.map(function(elem, i) {
			if (i%7 == 1)
				return arrLabels.push(moment(elem.weekend).subtract(10, 'days').calendar())
		});

		var arrData = [];
		var data = this.state.activity.map(function(elem) {
			return arrData.push(elem.total)
		});
		
		return {
			labels: arrLabels,
			datasets: [{
				label: 'My First dataset',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: arrData
			}]
		}
	},

	getOptions: function() {
		return {
			scaleShowGridLines: false,
			scaleGridLineColor: 'rgba(0,0,0,.05)',
			scaleShowHorizontalLines: true,
			scaleShowVerticalLines: true,
			bezierCurve: true,
			bezierCurveTension: 0.4,
			pointDot: true,
			pointDotRadius: 4,
			pointDotStrokeWidth: 1,
			pointHitDetectionRadius: 20,
			datasetStroke: true,
			datasetStrokeWidth: 2,
			datasetFill: true,
			legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
		}
	},

	render: function() {
		return (
			<div className="page__inner">
				<h2>Recent commit activity <small>per week</small></h2>
				<div className="page__content">
					<LineChart data={this.getData()} options={this.getOptions()} width="1020px" height="300" />
				</div>
			</div>
		);
	}

});

module.exports = Activity;
