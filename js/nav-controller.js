angular.module('navModule', [])
	.controller('nav', function($scope,$rootScope, $state, $http,appctrl) {

		/*
		 var pagewrapper = angular.element(document.querySelector('#page-wrapper'));
		 pagewrapper.css('margin', '0 0 0 0');
		 var wrapper = angular.element(document.querySelector('#wrapper'));
		 wrapper.css('background-color', '#FFFFFF');
		 */






		var vm = this;
		vm.setBackground=appctrl.setBackground;
		vm.setMouseOverOut=appctrl.setMouseOverOut;

	

		vm.mehtest="meh al the way";



	});