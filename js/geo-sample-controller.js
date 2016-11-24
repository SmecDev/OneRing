
var GeoSampleControl = function($rootScope, $http, $document, $timeout, $scope, appctrl, $interval, $q, uiGridConstants, uiGridGroupingConstants) {
 vm=this;

	vm.payload={
		"event": {
			"payloadData": {
				"id": "1001",
				"timeStamp": 56783,
				"latitude": 1.23434,
				"longitude": 4.504343,
				"type": "vehicle",
				"speed": 2.3,
				"heading": 8.9
			}
		}
	};


alert('yo');

	$http.get($rootScope.api_urls.GeoSample_url_read,vm.payload)
		.success(function(data) {


			alert('done');

		});



};

angular.module('app').controller('GeoSampleController', GeoSampleControl);


