
	app.controller('modulelistController', function ($scope, $http) {
		modulelistangular($scope,$http,url_modulelistangular);
		moduledelete($scope,$http,url_moduledelete);
	}).controller('modulelistAction', function ($scope, $http) {
		modulecheckroleaction($scope,$http,'/modulelist');
	}).controller('moduleDetailController', function ($scope, $http,$location) {
		$scope.moduledetail = modules;
		//alert("moduleDetailController");
		//modulelisttreeangular($scope,$http,url_modulelistangular);
		/*$(function () {
			$('#jstree3').on("changed.jstree", function (e, data) {
				$scope.modules.module.parent=data.selected;
				$scope.modules.module.parentname=data.node.text;
			});
		});*/
		//testabc($scope,$http,"http://10.15.171.21:8080/users/getall");
		modulelistangular($scope,$http,url_modulelistangular);
		getmoduledetailangular($scope,$http,url_moduledetailangular+"/"+geturlidhtml($location.absUrl()));
		actionmoduledetailangular($scope,$http,url_moduledetailangular);
	})