'use strict';

var React     = require('react');
var d3 				= require('d3');
var moment 	  = require('moment');


var ProgressBar = React.createClass({

	getInitialState: function() {
		return {
			data: this.props.languages
		}
	},

	renderChart: function() {
		var data = this.state.data.items;
		var _w = 100;
		var _h = 41 * data.length;
		var _delay = 100;
		var randomColor = function(i) {
			var color = (256/50) * i;
			return color.toFixed(0) + ', 95%, 75%';
		};

		var pbr = d3.select('#progressBar').append('svg')
			.attr('id', 'progressBar')
			.attr('width', _w +'%')
			.attr('height', _h);

		pbr.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('fill', function(d) {
				return 'hsl('+ randomColor(d.percentage) +')'
			})
			.attr('x', 0)
			.attr('y', function(d, i) {
				return i * _h/data.length;
			})
			.attr('height', _h/data.length)
			.attr('width', function(d) { return d.percentage +'%' });
			// .attr('width', 0 +'%')
			// .transition()
			// .ease('in-out')
			// .delay(function(d, i) { return _delay * i })

		// pbr.selectAll('text')
		// 	.data(data)
		// 	.enter()
		// 	.append('text')
		// 	.attr('x', 10)
		// 	.attr('y', function(d, i) {
		// 		return i * _h/data.length + _h/data.length/1.8;
		// 	})
		// 	.transition()
		// 	.ease('in-out')
		// 	.delay(function(d, i) { return _delay * i })
		// 	.tween('text', function(d, i) {
		// 		var currentValue = +this.textContent;
		// 		var interpolator = d3.interpolateRound(currentValue, d);
		// 		return function(t) {
		// 			this.textContent = data[i].label +' '+ interpolator(t) +'%';
		// 		};
		// 	});

	},

	componentDidMount: function() {
		this.renderChart();
	},

	render: function() {
		if (this.state.data.items.length > 0) {
			return (
				<div className="page__inner">
					<div className="page__content">
						<h2>Languages</h2>
						<div className="languages">
							<div id="progressBar">
								<ul className="list">
									{this.state.data.items.map(function(elem,i) {
										return <li key={i}><b>{elem.label}</b> {elem.percentage}%</li>
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <span></span>;
		}
	}

});


module.exports = ProgressBar;
