
	app.controller('factoroptionController', function ($scope, $http) {
		//alert(url_factoroptionlistangular);
		//$scope.factoroptions = factoroptions;
		factorlistangular($scope,$http,url_factorlistangular);
		factoroptionlistangular($scope,$http,url_factoroptionlistangular);
		
		factorChanged($scope,$http,url_factorchange);
		factoroptiondelete($scope,$http,url_factoroptiondelete);
	}).controller('factoroptionAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factoroptions');
	}).controller('factoroptionDetailController', function ($scope, $http,$location) {
		//alert(url_factoroptiondetailangular);
		$scope.factoroptions = factoroptions;
		factorlistangular($scope,$http,url_factorlistangular);
		getfactoroptiondetailangular($scope,$http,url_factoroptiondetailangular+"/"+geturlidhtml($location.absUrl()));
		actionfactoroptiondetailangular($scope,$http,url_factoroptiondetailangular);
	})