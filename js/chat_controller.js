
var ChatControl = function($rootScope, $document, $timeout, $scope) {


	$scope.chat = {};

	$scope.send_message = function (chat)
	{

		var menu = angular.element( document.querySelector( '#menu2' ) );

		menu.collapse('show');
		alert(JSON.stringify(chat));

	}


};

angular.module('app').controller('ChatControl', ChatControl);
