
	app.controller('groupmoduleController', function ($scope, $http) {
		$scope.groupmodule = groupmodule;
		grouplistangular($scope,$http,url_grouplistangular);
		//modulelisttreeangular($scope,$http,url_modulelistangular);
		modulelistangular($scope,$http,url_modulelistangular);
		//modulecheckroleaction($scope,$http,'/groupmodule');
		groupChanged($scope,$http,url_groupchange);
		/*$('#jstree3').on("changed.jstree", function (e, data) {
		//alert(data.selected);
			$scope.groupmodule.moduleid = data.selected;
		});*/
		actiongroupmoduledetailangular($scope,$http,url_groupmoduledetailangular);
	})