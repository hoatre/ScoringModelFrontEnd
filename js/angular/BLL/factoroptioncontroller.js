
	app.controller('factoroptionController', function ($scope, $http) {
		$scope.choiceModel="";
		$scope.choiceFactor="";
		modellistangular($scope,$http,url_modellistangular_scala);
		modelChanged($scope,$http);
		//$scope.factoroptionid = factoroptionid;
		//alert(url_factoroptionlistangular);
		//$scope.factoroptions = factoroptions;
		//factorlistangular($scope,$http,url_factorlistangular);
		//factoroptionlistangular($scope,$http,url_factoroptionlistangular);
		
		factorChanged($scope,$http,url_factorchange);
		factoroptiondelete($scope,$http,url_factoroptiondelete_scala);
	}).controller('factoroptionAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factoroptions');
	}).controller('factoroptionDetailController', function ($scope, $http,$location) {
		//alert(url_factoroptiondetailangular);
		$scope.factoroptiondetail = factoroptions;
		$scope.choiceFactor="";
		factorlistangular($scope,$http,url_factorlistangular_scala);
		var factorId = '';
		var factorOptionId = '';
		factorId = geturlvaluehtml($location.absUrl(),"factorId");
		factorOptionId = geturlvaluehtml($location.absUrl(),"factorOptionId");
		$scope.choiceFactor=factorId;
		getfactoroptiondetailangular($scope,$http,url_factoroptiondetail_scala,factorId,factorOptionId);
		actionfactoroptiondetailangular($scope,$http);
	})