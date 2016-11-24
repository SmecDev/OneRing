(function() {
	var app = angular.module('app', ['ui.router',  'navModule','ui.bootstrap'])

	// define for requirejs loaded modules
	//define('app', [], function() { return app; });

	// function for dynamic load with requirejs of a javascript module for use with a view
	// in the state definition call add property `resolve: req('/views/ui.js')`
	// or `resolve: req(['/views/ui.js'])`
	// or `resolve: req('views/ui')`
	function req(deps) {
		if (typeof deps === 'string') deps = [deps];
		return {
			deps: function ($q, $rootScope) {
				var deferred = $q.defer();
				require(deps, function() {
					$rootScope.$apply(function () {
						deferred.resolve();
					});
					deferred.resolve();
				});
				return deferred.promise;
			}
		}
	}


	app.service('appctrl', function($state,$http,$rootScope,$location) {


		vm=this;

		

		$rootScope.api_urls = {

			nav_url:'api_template/authandnav.json',
			applets_url :'api_template/applets.json',


		}







		vm.isUrl = function(url) {
			if (url === '#') return false;
			return ('#' + $state.$current.url.source + '/').indexOf(url + '/') === 0;
		};



		vm.setBackground = function(menu,menu_id) {

			$rootScope.navcontroldata.settings.nav_state={};


				$rootScope.navcontroldata.settings.nav_state[menu_id]= {
					background_color:$rootScope.navcontroldata.settings[menu].selected_color,
					icon_color:$rootScope.navcontroldata.settings[menu].selected_icon_color,
					alert_no:$rootScope.navcontroldata.settings[menu].alert_no,
					selected:true

				}


		}


		vm.setMouseOverOut = function(menu,menu_id,mouse_mode) {



				if (typeof $rootScope.navcontroldata.settings.nav_state[menu_id] =='undefined') {
					$rootScope.navcontroldata.settings.nav_state[menu_id] = {};
				}

				if (mouse_mode == 'over') {


					$rootScope.navcontroldata.settings.nav_state[menu_id].background_color = $rootScope.navcontroldata.settings[menu].selected_color;
					$rootScope.navcontroldata.settings.nav_state[menu_id].icon_color = $rootScope.navcontroldata.settings[menu].selected_icon_color;


				}


				if (mouse_mode == 'out' && !$rootScope.navcontroldata.settings.nav_state[menu_id].selected) {


					$rootScope.navcontroldata.settings.nav_state[menu_id].background_color = $rootScope.navcontroldata.settings[menu].background_color;
					$rootScope.navcontroldata.settings.nav_state[menu_id].icon_color = $rootScope.navcontroldata.settings[menu].icon_color;
				}



		}



	
		vm.navcontrol=function(state)
		{

			alert(JSON.stringify(state.name));
			$http.post($rootScope.api_urls.nav_url,  {}
			).success(function(data1){
				$rootScope.navcontroldata=data1;



				// THE CODE WILL BE REFACTORED TO BACK END

			//	alert($rootScope.navcontroldata.settings.top.background_color);

				var topnavbar = angular.element(document.querySelector('#navbar'));
				topnavbar.css('background-color', $rootScope.navcontroldata.settings.top.background_color);


				var submenu = angular.element(document.querySelector('.dropdown-menu'));
				submenu.css('background-color', $rootScope.navcontroldata.settings.top.background_color);

				alert('sub ran?');





				//alert('ja');

			

				if (state.name=='linechart')
					{
					$rootScope.navcontroldata.settings.side.show=false;
					}





			});




		};





	})

	app.run( ['$rootScope', '$state', '$stateParams', '$http','$window','$log','$timeout','appctrl',
		function ($rootScope,  $state,   $stateParams, $http, $window, $log, $timeout,appctrl) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.mychat=true;



			appctrl.navcontrol('showlast');

			$rootScope
				.$on('$stateChangeSuccess',
					function (event, toState, toParams, fromState, fromParams) {
						appctrl.navcontrol(toState);
					});


			/*
			if (typeof $rootScope.login=='undefined' && $window.location.hash=='#/login')
			{

				//alert ('1');
				$rootScope.login =  {

					state:false,

				};
				$rootScope.navmode = {
					onering: false,
					temphide:true,
				}
				var pagewrapper = angular.element( document.querySelector( '#page-wrapper' ) );
				pagewrapper.css('margin','0 0 0 0');

			}
		else
			{
				$rootScope.navmode = {
					onering: true,
					temphide:true,
				}


				$rootScope.login =  {

					state:true,

				};

			}

*/
			

		}

	])
	app.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
		var origController = app.controller
		app.controller = function (name, constructor){



			$controllerProvider.register(name, constructor);



			return origController.apply(this, arguments);
		}

		var viewsPrefix = 'views/';

		// For any unmatched url, send to /
		$urlRouterProvider.otherwise("/login")

		$stateProvider
			// you can set this to no template if you just want to use the html in the page
			.state('Home', {
				url: "/",
				templateUrl: viewsPrefix + "home.html",
				data: {
					pageTitle: 'Home'
				},


			})
			.state('about', {
				url: "/about",
				templateUrl: viewsPrefix + "about.html",
				data: {
					pageTitle: 'About'
				}
			})


			.state('example', {
				url: "/example",
				templateUrl: viewsPrefix + "example.html",
				data: {
					pageTitle: 'Example'
				}
			})


			.state('mychat', {
				url: "/mychat",
				templateUrl: viewsPrefix + "mychat.html",
				data: {
					pageTitle: 'My Chat'
				}
			})




			.state('blank', {
				url: "/blank",
				templateUrl: viewsPrefix + "blank.html",
				data: {
					pageTitle: 'Blank'
				}
			})
			.state('contact', {
				url: "/contact",
				templateUrl: viewsPrefix + "contact.html",
				data: {
					pageTitle: 'Contact'
				}
			})

			.state('apps', {
				url: "/apps",
				templateUrl: viewsPrefix + "apps.html",
				data: {
					pageTitle: 'Apps'
				}
			})

			.state('projects', {
				url: "/projects",
				templateUrl: viewsPrefix + "projects.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Projects'
				}
			})

			.state('portfolio', {
				url: "/portfolio",
				templateUrl: viewsPrefix + "portfolio.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Portfolio'
				}
			})

			.state('enterprise', {
				url: "/enterprise",
				templateUrl: viewsPrefix + "enterprise.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Enterprise'
				}
			})

			.state('programme', {
				url: "/programme",
				templateUrl: viewsPrefix + "programme.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Programme'
				}
			})
			.state('jobs', {
				url: "/jobs",
				templateUrl: viewsPrefix + "jobs.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Jobs'
				}
			})
			.state('payment', {
				url: "/payment",
				templateUrl: viewsPrefix + "payment.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Payment'
				}
			})

			.state('linechart', {
				url: "/linechart",
				templateUrl: viewsPrefix + "linechart.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Line Chart'
				}
			})

			.state('timeserieschart', {
				url: "/timeserieschart",
				templateUrl: viewsPrefix + "timeserieschart.html",
				controller: 'ChartControl as chrtCtl',
				data: {
					pageTitle: 'Time Series Chart'
				}
			})
			.state('contact.list', {
				url: "/list",
				templateUrl: viewsPrefix + "contact-list.html",
				controller: function($scope){
					$scope.things = ["A", "Set", "Of", "Things"];
				}
			})
			.state('theme', {
				url: "/theme",
				templateUrl: viewsPrefix + "theme.html",
				data: {
					pageTitle: 'Theme Example'
				}
			})
			.state('blog', {
				url: "/blog",
				templateUrl: viewsPrefix + "blog.html",
				data: {
					pageTitle: 'Blog'
				}
			})
			.state('grid', {
				url: "/grid",
				templateUrl: viewsPrefix + "grid.html",
				data: {
					pageTitle: 'Grid'
				}
			})
			.state('panels-wells', {
				url: "/panels-wells",
				templateUrl: viewsPrefix + "panels-wells.html",
				data: {
					pageTitle: 'Panels & Wells'
				}
			})

			.state('notifications', {
				url: "/notifications",
				templateUrl: viewsPrefix + "notifications.html",
				data: {
					pageTitle: 'Notifications'
				}
			})

			.state('typography', {
				url: "/typography",
				templateUrl: viewsPrefix + "typography.html",
				data: {
					pageTitle: 'Typography'
				}
			})

			.state('buttons', {
				url: "/buttons",
				templateUrl: viewsPrefix + "buttons.html",
				data: {
					pageTitle: 'Buttons'
				}
			})

			.state('ui', {
				url: "/ui",
				resolve: req('views/ui.js'),
				templateUrl: viewsPrefix + "ui.html",
				data: {
					pageTitle: 'UI'
				}
			})
			.state('dashboard', {
				url: "/dashboard",
				templateUrl: viewsPrefix + "dashboard.html",
				data: {
					pageTitle: 'Dashboard'
				}
			})

			.state('login', {
				url: "/login",
				templateUrl: viewsPrefix + "login.html",
				data: {
					pageTitle: 'Log In'
				}
			})

			.state('timeline', {
				url: "/timeline",
				templateUrl: viewsPrefix + "timeline.html",
				data: {
					pageTitle: 'Timeline'
				}
			})


			.state('timelinevisual', {
				url: "/timelinevisual",
				templateUrl: viewsPrefix + "timelinevisual.html",
				controller: 'TimeLineCtrl',
				data: {
					pageTitle: 'Timeline Visual'
				}
			})


			.state('tables', {
				url: "/tables",
				templateUrl: viewsPrefix + "tables.html",
				data: {
					pageTitle: 'Tables'
				}
			})

			.state('forms', {
				url: "/forms",
				templateUrl: viewsPrefix + "forms.html",
				data: {
					pageTitle: 'Forms'
				}
			})

			.state('flot', {
				url: "/flot",
				templateUrl: viewsPrefix + "flot.html",
				data: {
					pageTitle: 'Flow Chart'
				}
			})

	})
	.directive('updateTitle', ['$rootScope', '$timeout',
		function($rootScope, $timeout) {
			return {
				link: function(scope, element) {
					var listener = function(event, toState) {
						var title = 'Project Name';

						alert(JSON.stringify(toState));

						if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + ' - ' + title;
						$timeout(function() {
							element.text(title);
						}, 0, false);
					};

					$rootScope.$on('$stateChangeSuccess', listener);
				}
			};
		}
	]);



}());