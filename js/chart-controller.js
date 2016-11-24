
var ChartControl = function($rootScope, $document, $timeout, $scope, appctrl) {

	$scope.linechart = {
		data: {
			columns: [
				['data1', 30, 200, 100, 400, 150, 250],
				['data2', 50, 20, 10, 40, 15, 25]
			]
		}
	};
	
	
	



	$scope.timeserieschart ={
		data: {
			x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
				columns: [
				['x', '2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01', '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01'],
				['Actual Expentature',281433362, 281733262, 291736262, 371736262, 391453362, 441022001],
				['Projected Expendature', 181433362, 191433362, 251433362, 281423362, 371423362, 451022001]
			]
		},
		axis: {
			x: {
				type: 'timeseries',
					tick: {
					format: '%Y-%m-%d'
				}
			}
		}
	};



};

angular.module('app').controller('ChartControl', ChartControl);
