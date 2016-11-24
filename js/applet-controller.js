angular.module('appletModule', [])

.controller('applet', function($scope,$rootScope, $state, $http ,appctrl) {

		/*
		 var pagewrapper = angular.element(document.querySelector('#page-wrapper'));
		 pagewrapper.css('margin', '0 0 0 0');
		 var wrapper = angular.element(document.querySelector('#wrapper'));
		 wrapper.css('background-color', '#FFFFFF');
		 */








		var vm = this;
		vm.get_applets=function(){


			$http.post($rootScope.api_urls.applets_url,{}).success(function(data){

				vm.applets=data;

			});
		}


		vm.get_applets();



		vm.mehtest="meh al the way";



	})
	.directive('ngMoveable', function($document, $window){
		function makeMoveable(scope, element, attr) {
			var startX = 0;
			var startY = 0;

			// Start with a random pos
			var x = Math.floor((Math.random() * 500) + 40);
			var y = Math.floor((Math.random() * 360) + 40);

			element.css({
				position: 'absolute',
				cursor: 'pointer',
				top: y + 'px',
				left: x + 'px'
			});

			element.on('mousedown', function(event) {
				event.preventDefault();

				startX = event.pageX - x;
				startY = event.pageY - y;

				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;

				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
		}
		return {
			link: makeMoveable
		};
	});