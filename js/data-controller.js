
var DataControl = function($rootScope, $http, $document, $timeout, $scope, appctrl, $interval, $q, uiGridConstants, uiGridGroupingConstants) {
 vm=this;
//alert($rootScope.api_urls.data_url_read);
	$scope.gridOptions = {};
	$scope.gridOptions.data = 'myData';

	$http.get($rootScope.api_urls.data_url_read)
		.success(function(data1) {



			$scope.gridOptions.enableRowSelection = true;
			$scope.gridOptions.enableSelectAll = true;
			$scope.gridOptions.enableColumnResizing = true;
			$scope.gridOptions.enableFiltering = true;
			$scope.gridOptions.enableGridMenu = true;
			$scope.gridOptions.showGridFooter = true;
			$scope.gridOptions.showColumnFooter = true;
			$scope.gridOptions.fastWatch = true;

			$scope.gridOptions.rowIdentity = function(row) {
				return row.id;
			};
			$scope.gridOptions.getRowIdentity = function(row) {
				return row.id;
			};


			vm.columnheaders=Object.keys(data1[0]);


			$scope.gridOptions.columnDefs=[];

			for (col in vm.columnheaders)
			{

				if (vm.columnheaders[col]!='RecordID') {

					thisfield = {
						name: vm.columnheaders[col],
						width: 100,

					}

				}

				else {
					thisfield = {
						name: vm.columnheaders[col],
						width: 100,
						enableCellEdit: true
					}
				}


				$scope.gridOptions.columnDefs.push(thisfield);
			}

		//	alert(JSON.stringify($scope.gridOptions.columnDefs));
			/*
			$scope.gridOptions.columnDefs = [
				{ name:'id', width:50 },
				{ name:'name', width:100 },
				{ name:'age', width:100, enableCellEdit: true, aggregationType:uiGridConstants.aggregationTypes.avg, treeAggregationType: uiGridGroupingConstants.aggregation.AVG },
				{ name:'address.street', width:150, enableCellEdit: true },
				{ name:'address.city', width:150, enableCellEdit: true },
				{ name:'address.state', width:50, enableCellEdit: true },
				{ name:'address.zip', width:50, enableCellEdit: true },
				{ name:'company', width:100, enableCellEdit: true },
				{ name:'email', width:100, enableCellEdit: true },
				{ name:'phone', width:200, enableCellEdit: true },
				{ name:'about', width:300, enableCellEdit: true },
				{ name:'friends[0].name', displayName:'1st friend', width:150, enableCellEdit: true },
				{ name:'friends[1].name', displayName:'2nd friend', width:150, enableCellEdit: true },
				{ name:'friends[2].name', displayName:'3rd friend', width:150, enableCellEdit: true },
				{ name:'agetemplate',field:'age', width:150, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' },
				{ name:'Is Active',field:'isActive', width:150, type:'boolean' },
				{ name:'Join Date',field:'registered', cellFilter:'date', width:150, type:'date', enableFiltering:false },
				{ name:'Month Joined',field:'registered', cellFilter: 'date:"MMMM"', filterCellFiltered:true, sortCellFiltered:true, width:150, type:'date' }
			];
			*/

			$scope.callsPending = 0

			//alert('1');

			var i = 0;
			$scope.refreshData = function(){
				$scope.myData = [];

				var start = new Date();
				var sec = $interval(function () {
					$scope.callsPending++;

					$http.get($rootScope.api_urls.data_url_read)
						.success(function(data) {

							//	alert(JSON.stringify(data));
							$scope.callsPending--;

							data.forEach(function(row){
								row.id = i;
								i++;
								row.registered = new Date(row.registered)
								$scope.myData.push(row);
							});
						})
						.error(function() {
							$scope.callsPending--
						});
				}, 200, 10);


				var timeout = $timeout(function() {
					$interval.cancel(sec);
					$scope.left = '';
				}, 2000);

				$scope.$on('$destroy', function(){
					$timeout.cancel(timeout);
					$interval.cancel(sec);
				});

			};

			$scope.gridOptions.onRegisterApi = function(gridApi){
				//set gridApi on scope
				$scope.gridApi = gridApi;
				gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
					$scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
					$scope.$apply();
				});
			};

			$scope.addNewItem=function()
			{
				alert('ya vol');
				$scope.gridOptions.columnDefs.push($scope.gridOptions.columnDefs[0]);

				$scope.$apply();
			}



		});


	//alert('2');



};

angular.module('app').controller('DataController', DataControl);


