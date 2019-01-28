
const request = require('request');

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};



function onRefresh(chart) {
	
    request('http://localhost:3000/livechart', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var temparature=document.getElementById('temparature');
		temparature.innerHTML=body.temparature;
		var humidity=document.getElementById('humidity');
		humidity.innerHTML=body.humidity;
		var distance=document.getElementById('distance');
		distance.innerHTML=body.distance;
		var lamb_status=document.getElementById('lampstatus');
		lamb_status.innerHTML=body.lamb_status;
        chart.config.data.datasets.forEach(function(dataset) {
            var value = 0;
           switch(dataset.label){
               case "Temparature":
               value=body.temparature;
               break;
               case "Humidity":
               value=body.humidity;
               break;
               case "Distance":
               value=body.distance;
               break;
               case "Lamp Status":
               value=body.lamb_status;
               break;
               default:
               break;
    
           }    
            dataset.data.push({
                x: Date.now(),
                y: value
            });
        });
      });



}

var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Temparature',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],
			data: []
		},{
			label: 'Humidity',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'Distance',
			backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
			borderColor: chartColors.grey,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'Lamp Status',
			backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Line chart (hotizontal scroll) sample'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 3000,
					delay: 4000,
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'value'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		}
	}
};

window.onload = function() {
    var gt=document.getElementById('myChart')
    if(gt){
        var ctx = gt.getContext('2d');
        window.myChart = new Chart(ctx, config);
    }
	
};
var el = document.getElementById('randomizeData');
if(el){
el.addEventListener('click', function() {
	config.data.datasets.forEach(function(dataset) {
		dataset.data.forEach(function(dataObj) {
			dataObj.y = randomScalingFactor();
		});
	});
	window.myChart.update();
});
}
