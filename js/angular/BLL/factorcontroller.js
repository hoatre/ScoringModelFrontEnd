
	app.controller('factorController', function ($scope, $http) {
		$scope.choiceModel = '';
		modellistangular($scope,$http,url_modellistangular_scala);
		modelChanged($scope,$http);
		//factorlistangular($scope,$http,url_factorlistangular);
		factordelete($scope,$http,url_factordelete);
	}).controller('factorAction', function ($scope, $http) {
		//modulecheckroleaction($scope,$http,'/factors');
	}).controller('factorDetailController', function ($scope, $http,$location) {
		//alert(url_factordetailangular);
		$scope.choiceModel = '';
		$scope.factordetail = factors;
		modellistangular($scope,$http,url_modellistangular_scala);
		//factorlistangular($scope,$http,url_factorlistangular_scala);

		getfactordetailangular($scope,$http,url_factordetailbyfactoridtangular_scala,geturlidhtml($location.absUrl()));
		modeldetailChanged($scope,$http)
		//factorlistbymodelidangular($scope,$http);
		actionfactordetailangular($scope,$http,url_factorupdateangular_scala);
	})