'use strict';

var React     = require('react');
var d3 				= require('d3');
var moment 	  = require('moment');


var Timeline = React.createClass({

	getInitialState: function() {
		return {
			data: this.props.commits
		}
	},

	renderChart: function() {
		var data = this.state.data;
		var margin = {
			top: 30, 
			right: 20, 
			bottom: 30, 
			left: 20
		};

		var width = 1062 - margin.left - margin.right;
		var height = 300 - margin.top - margin.bottom;

		var xValues = data.map(function(d, i) { return i });
		var yValues = data.map(function(d) { return d.value });

		var x = d3.time.scale()
			.domain([xValues[0], xValues[xValues.length - 1]])
			.range([0, width]); 

		var xAxis = d3.svg.axis()
			.scale(x)
			.tickSize(-height, -height)
			.tickFormat(function(d) { return '' })
			.orient('bottom');

		var y = d3.scale.linear()
			.domain([0, d3.max(yValues)])
			.range([height, 0]);

		var yAxis = d3.svg.axis()
			.scale(y)
			.tickSize(0, -width)
			.tickFormat(function(d) { return '' })
			.orient('left');

		var chart = d3.select('#timeline').append('svg')
			.attr('id', 'chart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			// .attr('viewBox', '0 0 '+ width +' '+ height )
			// .attr('perserveAspectRatio', 'xMinYMid')
			.append('g')
			.attr('transform', 'translate('+ margin.left +','+ margin.top +')');

		chart.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,'+ height +')')
			.call(xAxis);

		chart.append('g')
			.attr('class', 'y axis')
			.call(yAxis);

		var line = d3.svg.line()
			.interpolate('cardinal') 
			.x(function(d,i) { return x(i) })
			.y(function(d) { return y(d.value) });

		var path = chart.append('path')
			.attr('class', 'graph');

		d3.transition().selectAll('.graph')
			.attr('d', function(d,i) { return line(data[i].value); });

		var div = d3.select('body').append('div')   
			.attr('class', 'tooltip')               
			.style('opacity', 0);

		chart
			.selectAll('circle')
			.data(data)
			.enter().append('circle')
			.attr('class', 'dot')
			.attr('r', 5)
			.attr('cx', function(d,i) { return x(i) })
			.attr('cy', function(d) { return y(d.value) })
			// .transition()
			// .ease('in-out')
			// .delay(function(d, i) { return 200 * i })
			// .style('opacity', 1)
			.on('mouseover', function(d) {
				div.transition()
					.duration(200)
					.style('opacity', .9);
				div.html(d.label + ' : ' + d.value)
					.style('left', (d3.event.pageX) +'px') 
					.style('top', (d3.event.pageY - 28) +'px') 
			})
			.on('mouseout', function(d) {
				div.transition()
					.duration(500)
					.style('opacity', 0)
			});
		

		chart.select('.x.axis').call(xAxis);
		chart.select('.y.axis').call(yAxis);
		chart.select('.graph')
			.transition()
			.attr('d', line(data));


		// var getSmoothInterpolation function() {
		// 	var interpolate = d3.scale.linear()
		// 		.domain([0, 1])
		// 		.range([1, data.length + 1]);

		// 	return function(t) {
		// 		var flooredX = Math.floor(interpolate(t));
		// 		var interpolatedLine = data.slice(0, flooredX);
							
		// 		if(flooredX > 0 && flooredX < data.length) {
		// 			var weight = interpolate(t) - flooredX;
		// 			var weightedLineAverage = data[flooredX].y * weight + data[flooredX-1].y * (1-weight);
		// 			interpolatedLine.push( {'x':interpolate(t)-1, 'y':weightedLineAverage} );
		// 		}
			
		// 		return line(interpolatedLine);
		// 	}
		// }

		// d3.select('.graph')
		// 	.transition()
		// 	.duration(5000)
		// 	.attrTween('d', getSmoothInterpolation);

		// Responsive
		// var svg = document.querySelector('#chart');
		// var aspect = chart.offsetWidth / chart.offsetHeight;
		// var container = document.querySelector('#wrap');

		// var updateWindow = function() {
		// 	var targetWidth = container.offsetWidth;
		// 	svg.attr('width', targetWidth);
		// 	svg.attr('height', Math.round(targetWidth / aspect));
		// };
		// window.onresize = updateWindow;
	},

	componentDidMount: function() {
		this.renderChart();
	},

	render: function() {
		return (
			<div className="page__inner">
				<div className="commits has-background">
					<div id="timeline" className="animated fadeIn"></div>
				</div>
			</div>
		);
	}

});


module.exports = Timeline;
