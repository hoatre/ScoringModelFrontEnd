
	app.controller('grouplistController', function ($scope, $http) {
		//alert(url_grouplistangular);
		grouplistangular($scope,$http,url_grouplistangular);
		groupdelete($scope,$http,url_groupdelete);
	}).controller('grouplistAction', function ($scope, $http) {
		modulecheckroleaction($scope,$http,'/grouplist');
	}).controller('groupDetailController', function ($scope, $http,$location) {
		$scope.groups = groups;
		getgroupdetailangular($scope,$http,url_groupdetailangular+"/"+geturlidhtml($location.absUrl()));
		actiongroupdetailangular($scope,$http,url_groupdetailangular);
	})