
	app.controller('factorController', function ($scope, $http) {
		//alert(url_factorlistangular);
		factorlistangular($scope,$http,url_factorlistangular);
		factordelete($scope,$http,url_factordelete);
	}).controller('factorAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factors');
	}).controller('factorDetailController', function ($scope, $http,$location) {
		//alert(url_factordetailangular);
		$scope.factordetail = factors;
		factorlistangular($scope,$http,url_factorlistangular);
		getfactordetailangular($scope,$http,url_factordetailangular+"/"+geturlidhtml($location.absUrl()));
		actionfactordetailangular($scope,$http,url_factordetailangular);
	})